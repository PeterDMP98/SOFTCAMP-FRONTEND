import httpClient from "./httpClient";

export const obtenerGanado = async () => {
  const res = await httpClient.get("/ganado");


  if (Array.isArray(res.data)) {
    return res.data;
  }

  if (Array.isArray(res.data.data)) {
    return res.data.data;
  }

  return [];
};

export const agregarGanado = async (data) => {
  const res = await httpClient.post("/ganado", data);
  return res.data;
};

export const actualizarGanado = async (id, data) => {
  const res = await httpClient.put(`/ganado/${id}`, data);
  return res.data;
};

export const eliminarGanado = async (id) => {
  const res = await httpClient.delete(`/ganado/${id}`);
  return res.data;
};
