const express = require("express");
const axios = require("axios");

const app = express();
const PORT = 9876;
const WINDOW_SIZE = 10;
const FETCH_TIMEOUT = 500;

const numberStorage = {
    p: [],
    f: [],
    e: [],
    r: []
};

const API_URLS = {
    p: "https://api.math.tools/numbers/prime?n=1",  // Prime numbers
    f: "https://api.mathjs.org/v4/?expr=fibonacci(10)",  // Fibonacci sequence
    e: "https://www.randomnumberapi.com/api/v1.0/random?min=2&max=100&count=1",  // Even numbers
    r: "https://www.randomnumberapi.com/api/v1.0/random?min=2&max=10&count=100"  // Random numbers online API call
};

async function fetchNumber(type) {
    try {
        const source = axios.CancelToken.source();
        setTimeout(() => source.cancel(), FETCH_TIMEOUT);
        
        const response = await axios.get(API_URLS[type], { cancelToken: source.token });
        return response.data[0]; 
    } catch (error) {
        return null;
    }
}

app.get("/numbers/:numberid", async (req, res) => {
    const { numberid } = req.params;
    if (!["p", "f", "e", "r"].includes(numberid)) {
        return res.status(400).json({ error: "Invalid number ID" });
    }

    const prevState = [...numberStorage[numberid]];
    const newNumber = await fetchNumber(numberid);
    
    if (newNumber !== null && !numberStorage[numberid].includes(newNumber)) {
        numberStorage[numberid].push(newNumber);
        if (numberStorage[numberid].length > WINDOW_SIZE) {
            numberStorage[numberid] = numberStorage[numberid].slice(-WINDOW_SIZE); 
        }
    }
    
    const average = numberStorage[numberid].length
        ? numberStorage[numberid].reduce((sum, num) => sum + num, 0) / numberStorage[numberid].length
        : 0;

    res.json({
        windowPrevState: prevState,
        windowCurrState: [...numberStorage[numberid]],
        numbers: [...numberStorage[numberid]],
        avg: parseFloat(average.toFixed(2))
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
