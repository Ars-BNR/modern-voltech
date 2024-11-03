"use client";

import { Errors, IInfoOrder } from "@/types/type";
import { useCallback, useEffect, useState } from "react";
import { CheckoutScheme } from "../constants/validateScheme";
import { ZodError } from "zod";

const useOrderValidation = (order: IInfoOrder) => {
  const [errors, setErrors] = useState({} as Errors);
  const validate = useCallback(async () => {
    try {
      CheckoutScheme.parse(order);
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
  }, [order]);

  useEffect(() => {
    validate();
  }, [order]);

  return { errors, validate };
};
export default useOrderValidation;
