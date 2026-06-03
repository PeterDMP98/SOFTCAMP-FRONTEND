import httpClient from "./httpClient.js";

export const iaService = {
  // CHAT
  async enviarMensaje(id_chat, contenido, contextoUsuario = {}) {
    const response = await httpClient.post("/ia/chat", {
      id_chat,
      contenido,
      contextoUsuario,
    });
    return response.data;
  },

  async obtenerMisChats(limit = 20, offset = 0) {
    const response = await httpClient.get("/ia/chat", { params: { limit, offset } });
    return response.data;
  },

  async obtenerChat(id_chat) {
    const response = await httpClient.get(`/ia/chat/${id_chat}`);
    return response.data;
  },

  async renombrarChat(id_chat, titulo) {
    const response = await httpClient.put(`/ia/chat/${id_chat}`, { titulo });
    return response.data;
  },

  async eliminarChat(id_chat) {
    const response = await httpClient.delete(`/ia/chat/${id_chat}`);
    return response.data;
  },

  // RECOMENDACIONES
  async generarRecomendaciones(contextoUsuario = {}) {
    const response = await httpClient.post("/ia/recomendaciones", { contextoUsuario });
    return response.data;
  },

  async obtenerMisRecomendaciones(solo_pendientes = true) {
    const response = await httpClient.get("/ia/recomendaciones", { params: { solo_pendientes } });
    return response.data;
  },

  async aceptarRecomendacion(id_recomendacion) {
    const response = await httpClient.post(`/ia/recomendaciones/${id_recomendacion}/aceptar`);
    return response.data;
  },

  async rechazarRecomendacion(id_recomendacion) {
    const response = await httpClient.post(`/ia/recomendaciones/${id_recomendacion}/rechazar`);
    return response.data;
  },

  // TAREAS
  async generarTarea(id_recomendacion) {
    const response = await httpClient.post(`/ia/tareas/${id_recomendacion}`);
    return response.data;
  },

  async obtenerMisTareasGeneradas() {
    const response = await httpClient.get("/ia/tareas");
    return response.data;
  },

  // ESTADÍSTICAS
  async obtenerEstadisticas() {
    const response = await httpClient.get("/ia/estadisticas");
    return response.data;
  },

  // HEALTH
  async checkHealth() {
    const response = await httpClient.get("/ia/health");
    return response.data;
  },
};
