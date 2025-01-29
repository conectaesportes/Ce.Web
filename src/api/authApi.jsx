import axiosInstance from './axiosInstance';

export const login = async (email, password) => {
  //colocar o /api quando for pra produção
  const response = await axiosInstance.post('/app/usuario/login', { "email": email, "senha": password });
  console.log(response.data);
  return response.data; // Assume que retorna { token, user }
};
