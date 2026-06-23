import httpClient from "./httpClient";

export const syncApi = {
  push: async (operations) => {
    return httpClient.post("/sync/push", { operations });
  },
  pull: async () => {
    return httpClient.get("/sync/pull");
  },
  status: async () => {
    return httpClient.get("/sync/status");
  },
};

export default syncApi;
