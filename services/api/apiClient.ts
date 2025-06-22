import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    ...(process.env.NEXT_PUBLIC_JWT_TOKEN && {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_JWT_TOKEN}`
    })
  },
});

// Interceptores podem ser adicionados aqui (ex: auth tokens)
export default apiClient;