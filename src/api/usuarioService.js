import httpClient from "./httpClient";

export const usuarioService = {
  getContrapartes: async () => {
    const res = await httpClient.get("/usuarios/contrapartes");
    return res?.data || [];
  },
};

export default usuarioService;
