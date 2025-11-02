const axios = require('axios');

exports.handler = async (event) => {
  const API_BASE = 'http://45.33.73.99:5000/api';
  
  // Get the path after /api-proxy
  const path = event.path.replace('/.netlify/functions/api-proxy', '');
  const url = `${API_BASE}${path}`;
  
  try {
    const response = await axios({
      method: event.httpMethod,
      url: url,
      data: event.body ? JSON.parse(event.body) : undefined,
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    return {
      statusCode: 200,
      body: JSON.stringify(response.data),
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    };
  } catch (error) {
    console.error('Proxy error:', error.message);
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        error: error.message,
        url: url 
      })
    };
  }
};