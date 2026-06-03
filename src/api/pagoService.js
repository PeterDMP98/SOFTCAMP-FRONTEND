import httpClient from "./httpClient";

const ENDPOINT = "/pagos";

export const pagoService = {
  getAll: async () => {
    const res = await httpClient.get(ENDPOINT);
    return res.data?.data || [];
  },
  create: async (data) => {
    const res = await httpClient.post(ENDPOINT, data);
    return res.data;
  },
  updateEstado: async (id, estado) => {
    const res = await httpClient.put(`${ENDPOINT}/${id}`, { estado_pago: estado });
    return res.data;
  }
};

export default pagoService;