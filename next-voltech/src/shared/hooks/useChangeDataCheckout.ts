"use client";

import { IInfoOrder } from "@/types/type";
import parsePhoneNumberFromString from "libphonenumber-js";
import { SetStateAction, useCallback } from "react";

const useChangeDataCheckout = (
  Setorder: React.Dispatch<SetStateAction<IInfoOrder>>
) => {
  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.name === "number") {
        const phoneNumber = parsePhoneNumberFromString(
          event.target.value,
          "RU"
        );
        if (phoneNumber) {
          event.target.value = phoneNumber.formatInternational();
        }
      }
      const { name, value } = event.target;
      Setorder((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    },
    []
  );
  return {
    handleChange,
  };
};

export default useChangeDataCheckout;
