import httpClient from "./httpClient";

const ENDPOINT = "/carrito";

export const carritoService = {
  getAll: async () => {
    const res = await httpClient.get(ENDPOINT);
    return res.data?.data || [];
  },
  addItem: async (data) => {
    const res = await httpClient.post(ENDPOINT, data);
    return res.data;
  },
  removeItem: async (id_producto) => {
    const res = await httpClient.delete(`${ENDPOINT}/${id_producto}`);
    return res.data;
  },
  clear: async () => {
    const res = await httpClient.delete(ENDPOINT);
    return res.data;
  }
};

export default carritoService;