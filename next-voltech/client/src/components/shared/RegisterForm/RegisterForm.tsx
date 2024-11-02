"use client";

import React, { FC, FormEvent, useCallback, useEffect, useState } from "react";
import classes from "./RegisterForm.module.css";
import TextField from "../../ui/Form/TextField";
import { Data, Errors } from "@/types/type";
import Link from "next/link";
import { formRegisterSchema } from "@/shared/constants/validateScheme";
import { ZodError } from "zod";
import AuthStore from "@/shared/store/auth";
import { useRouter } from "next/navigation";

export const RegisterForm: FC = () => {
  const registration = AuthStore((state) => state.registration);
  const router = useRouter();
  const [data, setData] = useState({
    login: "",
    password: "",
    confirmPassword: "",
  } as Data);

  const [errors, setErrors] = useState({} as Errors);

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

  const validate = useCallback(async () => {
    try {
      formRegisterSchema.parse(data);
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

  const isValid = Object.keys(errors).length == 0;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;
    try {
       registration({
        login: data.login,
        password: data.password,
        router,
      });
    } catch (error) {
      if (error instanceof Error) {
        console.log(error);
      }
    }
  };
  return (
    <div className={classes.registerPage}>
      <form onSubmit={handleSubmit} className={classes.registerBlock}>
        <p className={classes.registerBlock__title}>Регистрация</p>
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
        <TextField
          type="password"
          name="confirmPassword"
          value={data.confirmPassword}
          onChange={handleChange}
          placeholder="Подтверждение пароля"
          error={errors.confirmPassword}
        />
        <button
          className={classes.registerBlock__btnBlack}
          type="submit"
          disabled={!isValid}
        >
          Зарегистрироваться
        </button>
        <button className={classes.registerBlock__btnWhite}>
          <Link href="/login">Войти</Link>
        </button>
      </form>
    </div>
  );
};
