/*NO UTLIZABLE ELIMINAR AL FINLIZAR */

import axios from 'axios';

const API_URL = 'http://localhost:3000/api/ganado';

const obtenerGanado = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

const agregarGanado = async (ganado) => {
  const response = await axios.post(API_URL, ganado);
  return response.data;
};

const actualizarGanado = async (id, ganado) => {
  const response = await axios.put(`${API_URL}/${id}`, ganado);
  return response.data;
};

const eliminarGanado = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};
