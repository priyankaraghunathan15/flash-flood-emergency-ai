exports.handler = async (event) => {
  const API_BASE = 'http://45.33.73.99:5000/api';
  
  // Get the path and method from the request
  const path = event.path.replace('/.netlify/functions/api-proxy', '');
  const url = `${API_BASE}${path}`;
  
  try {
    const response = await fetch(url, {
      method: event.httpMethod,
      headers: event.headers,
      body: event.body
    });
    
    const data = await response.text();
    
    return {
      statusCode: response.status,
      body: data,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};