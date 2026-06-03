import httpClient from "./httpClient";

const ENDPOINT = "/stock";

export const stockService = {
  getAll: async () => {
    const res = await httpClient.get(ENDPOINT);
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

export default stockService;