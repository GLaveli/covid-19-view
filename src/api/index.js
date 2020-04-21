const axios = require('axios');

const api = axios.create({
  baseURL: 'https://api.coronaanalytic.com'
});
export default api;
