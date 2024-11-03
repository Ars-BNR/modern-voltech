import $api from "./http-service";

const orderPostEndpoint = "/order";
const orderGetEndpoint = "/order/user";
const orderDeleteEndpoint = "/order/delete";
const orderGetInfoeEndpoint = "/order/user";
const orderGetAllEndpoint = "/order/getAll";
const orderChangeStatusEndpoint = "/order/status";
const orderUserCancelEndpoint = "/order/usercancel";

const orderService = {
  post: async (order: object) => {
    const { data } = await $api.post(orderPostEndpoint, order);
    return data;
  },
  get: async (id_user: number) => {
    const { data } = await $api.get(`${orderGetEndpoint}/${id_user}`);
    return data;
  },
  delete: async (id_order: string) => {
    const { data } = await $api.delete(`${orderDeleteEndpoint}/${id_order}`);
    return data;
  },
  getInfoOrder: async (id_user: number,id_order: string) => {
    const { data } = await $api.get(`${orderGetInfoeEndpoint}/${id_user}/${id_order}`);
    return data;
  },
  getAll: async () => {
    const token = localStorage.getItem("token");
    const { data } = await $api.get(orderGetAllEndpoint, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return data;
  },
  changeStatus: async (orderStatus: {
    id_order: string;
    newStatus: string;
  }) => {
    const { data } = await $api.patch(orderChangeStatusEndpoint, orderStatus);
    return data;
  },
  userCancel: async (id_user: number,id_order: string) => {
    const { data } = await $api.patch(`${orderUserCancelEndpoint}/${id_user}/${id_order}`);
    return data;
  },
};

export default orderService;
