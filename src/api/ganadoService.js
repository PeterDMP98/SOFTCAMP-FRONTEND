import httpClient from "./httpClient";

const ENDPOINT = "/ganado";

export const ganadoService = {
  getAll: async () => {
    const res = await httpClient.get(ENDPOINT);
    console.log("ganadoService.getAll response:", res.data);
    return res.data?.data || [];
  },

  getById: async (id) => {
    const res = await httpClient.get(`${ENDPOINT}/${id}`);
    return res.data?.data;
  },

  create: async (data) => {
    const res = await httpClient.post(ENDPOINT, data);
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

export default ganadoService;