import axios from "axios";
let baseURL = `https://newsapi.org/v2`;
let apiKey = 'fc4c17c7249440b4828190811822335c';

const instance = axios.create({
    baseURL: baseURL,
    timeout: 30000,
    headers: {
        "X-Api-Key": apiKey,
    },
});
export default instance;