import httpClient from "./httpClient";

const ENDPOINT = "/lotes";

export const loteService = {
  getAll: async () => {
    const res = await httpClient.get(ENDPOINT);
    return res.data?.data || [];
  },

  getInactive: async () => {
    const res = await httpClient.get(`${ENDPOINT}/inactivos`);
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

  deactivate: async (id) => {
    const res = await httpClient.delete(`${ENDPOINT}/${id}`);
    return res.data;
  },

  reactivate: async (id) => {
    const res = await httpClient.put(`${ENDPOINT}/${id}/reactivar`);
    return res.data;
  }
};

export default loteService;