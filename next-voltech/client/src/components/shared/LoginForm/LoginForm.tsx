"use client";

import { Errors } from "@/types/type";
import { FC, FormEvent, useCallback, useEffect, useState } from "react";
import styles from "./LoginForm.module.css";
import Link from "next/link";
import TextField from "../../ui/Form/TextField";
import { formLoginSchema } from "@/shared/constants/validateScheme";
import AuthStore from "@/shared/store/auth";
import { useRouter } from "next/navigation";
import { ZodError } from "zod";

export const LoginForm: FC = () => {
  const login = AuthStore((state) => state.login);
  const router = useRouter();
  const [data, setData] = useState({
    login: "",
    password: "",
  });

  const [errors, setErrors] = useState({} as Errors);

  const validate = useCallback(async () => {
    try {
      formLoginSchema.parse(data);
      setErrors({});
      return true;
    } catch (err) {
      if (err instanceof ZodError) {
        setErrors({
          [err.errors[0]?.path[0] as string]: err.errors[0]?.message,
        });
      } else {
        console.error("Unexpected error", err);
      }
      return false;
    }
  }, [data]);

  useEffect(() => {
    validate();
  }, [data]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      login({ login: data.login, password: data.password, router });
    } catch (error) {
      if (error instanceof Error) {
        console.log(error);
      }
    }
  };
  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;
      setData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    },
    []
  );
  return (
    <div className={styles.login}>
      <div className={styles.loginPage}>
        <form onSubmit={handleSubmit} className={styles.loginBlock}>
          <p className={styles.loginBlock__title}>Вход</p>
          <TextField
            type="text"
            name="login"
            value={data.login}
            onChange={handleChange}
            placeholder="Логин"
            error={errors.login}
          />
          <TextField
            type="password"
            name="password"
            value={data.password}
            onChange={handleChange}
            placeholder="Пароль"
            error={errors.password}
          />
          <button type="submit" className={styles.loginBlock__btnBlack}>
            Войти
          </button>
          <button className={styles.loginBlock__btnWhite}>
            <Link href="/registration">Зарегистрироваться</Link>
          </button>
        </form>
      </div>
    </div>
  );
};
