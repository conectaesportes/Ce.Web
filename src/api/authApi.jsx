import axiosInstance from './axiosInstance';

export const login = async (email, password) => {
  const response = await axiosInstance.post('/api/app/usuario/login', { "email": email, "senha": password });
  console.log(response.data);
  return response.data; // Assume que retorna { token, user }
};
