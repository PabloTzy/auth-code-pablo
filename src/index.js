// src/index.js
const axios = require('axios');

let apiKey = null;

const auth = {
    key: (key) => {
        apiKey = key;
        console.clear();
        console.log(`🔑 API Key set to: ${apiKey}`);
    },
    start: async (connectFunction) => {
        if (!apiKey) {
            console.clear();
            console.error('❌ API Key is missing. Please set your API Key using auth.key() before starting.');
            return;
        }

        console.clear();
        console.log('🚀 Starting API Key validation...');

        try {
            const response = await axios.get(`https://apikey-pablo.vercel.app/active?apikey=${apiKey}`);
            const { active, reason } = response.data;

            if (active) {
                console.clear();
                console.log('✅ API Key is valid! Access granted.');
                await new Promise(resolve => setTimeout(resolve, 5000));  // Optional delay

                console.clear();
                await connectFunction();  // Call the function passed in
            } else {
                console.clear();
                console.log(`❌ Access denied. Invalid API Key. Reason: ${reason}`);
            }
        } catch (error) {
            console.clear();
            console.error('⚠️ Error during API Key validation:', error.message);
        }
    }
};

module.exports = auth;
