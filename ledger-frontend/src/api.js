//import axios from 'axios';
// This file sets up the Axios instance for API requests
// It uses the base URL from environment variables or defaults to localhost
// If you are using Vite, ensure to set the environment variable in your .env file
// or directly in the Vite config
// If you are using Create React App, ensure to prefix your environment variables with REACT_APP_
// For example, REACT_APP_API_BASE_URL=http://localhost:5000/api
// If you are using Next.js, ensure to set the environment variable in your .env.local file
import axios from 'axios';



export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api'
});

