import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:3000/api', // replace with your backend URL
  headers: {
    'Content-Type': 'application/json',
  },
});

export const login = (data: any) => {
  return apiClient.post('/auth/login', data);
};

export const signup = (data: any) => {
  return apiClient.post('/auth/signup', data);
};

export const submitForm = (data: any) => {
    return apiClient.post('/userform', data);
};
