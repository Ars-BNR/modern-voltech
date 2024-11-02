import $api from "./http-service";

const loginEndpoint = "/login";
const registerEndpoint = "/registration";
const exitEndpoint = "/logout";
const refreshEndpoint = "/refresh";
const profileEndpoint = "/users";

const userService={
    login: async (login: string, password: string) => {
        const { data } = await $api.post(loginEndpoint, { login, password });
        return data;
      },
      registration: async (login: string, password: string) => {
        const { data } = await $api.post(registerEndpoint, {
          login,
          password,
        });
        return data;
      },
      logout: async () => {
        const { data } = await $api.post(exitEndpoint);
        return data;
      },
      refresh: async () => {
        const { data } = await $api.get(refreshEndpoint);
        return data;
      },
      getUsers: async () => {
        const { data } = await $api.get(profileEndpoint);
        return data;
      },
}

export default userService;