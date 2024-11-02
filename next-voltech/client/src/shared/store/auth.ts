import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { create } from "zustand";
import { profiles } from "@/types/store-types";
import userService from "../service/user-service";

export interface ArgsForAction {
  login: string;
  password: string;
  router: AppRouterInstance;
}
export interface AuthState {
  profiles: profiles;
  isAuth: boolean;
  isLoading: boolean;
  login: (args: ArgsForAction) => Promise<void>;
  registration: (args: ArgsForAction) => Promise<void>;
  logout: (router: AppRouterInstance) => Promise<void>;
  checkAuth: () => Promise<void>;
}

const AuthStore = create<AuthState>((set) => ({
  profiles: {
    accessToken: "",
    user: {},
    refreshToken: "",
  },
  isAuth: false,
  isLoading: false,

  login: async ({ login, password, router }) => {
    try {
      set({ isLoading: true });
      const data = await userService.login(login, password);
      localStorage.setItem("token", data.accessToken);
      set({ profiles: data, isAuth: true });
      router.push("/");
    } catch (error) {
      console.error(error);
    } finally {
      set({ isLoading: false });
    }
  },
  registration: async ({ login, password, router }) => {
    try {
      set({ isLoading: true });
      const data = await userService.registration(login, password);
      localStorage.setItem("token", data.accessToken);
      set({ profiles: data, isAuth: true });
      router.push("/");
    } catch (error) {
      console.error(error);
    } finally {
      set({ isLoading: false });
    }
  },
  logout: async (router) => {
    try {
      set({ isLoading: true });
      await userService.logout();
      localStorage.removeItem("token");
      set({
        profiles: {
          accessToken: "",
          user: {},
          refreshToken: "",
        },
        isAuth: false,
      });
      router.replace("/");
    } catch (error) {
      console.error(error);
    } finally {
      set({ isLoading: false });
    }
  },
  checkAuth: async () => {
    try {
      set({ isLoading: true });
      const data = await userService.refresh();
      localStorage.setItem("token", data.accessToken);
      set({ profiles: data, isAuth: true });
    } catch (error) {
      console.error(error);
    } finally {
      set({ isLoading: false });
    }
  },
}));
export default AuthStore;
