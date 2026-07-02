import httpClient from "./httpClient";

const ENDPOINT = "/historial-clinico";

export const historialClinicoService = {
  getAll: async () => {
    const res = await httpClient.get(ENDPOINT);
    return res.data?.data || [];
  },
  getByGanado: async (id_ganado) => {
    const res = await httpClient.get(`${ENDPOINT}/ganado/${id_ganado}`);
    return res.data?.data || [];
  },
  getById: async (id) => {
    const res = await httpClient.get(`${ENDPOINT}/${id}`);
    return res.data?.data;
  },
  create: async (id_ganado, data) => {
    const res = await httpClient.post(`${ENDPOINT}/ganado/${id_ganado}`, data);
    return res.data;
  },
  update: async (id, data) => {
    const res = await httpClient.put(`${ENDPOINT}/${id}`, data);
    return res.data;
  },
  delete: async (id) => {
    const res = await httpClient.delete(`${ENDPOINT}/${id}`);
    return res.data;
  }
};

export default historialClinicoService;