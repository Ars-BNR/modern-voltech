import { z } from "zod";

export const passwordSchema = z
  .string()
  .min(8, "Пароль должен быть минимум из 8 символов")
  .regex(/[A-Z]/, "Пароль должен содержать хотя бы одну букву Латиницы")
  .regex(/[0-9]/, "Пароль должен содержать хотя бы одно число");

export const formLoginSchema = z.object({
  login: z.string().min(1, "Логин обязателен для заполнения"),
  password: z.string().min(1, "Пароль обязателен для заполнения"),
});

export const formRegisterSchema = z
  .object({
    login: z
      .string()
      .min(3, "Логин должен содержать минимум 3 символа")
      .max(15, "Логин должен содержать не более 15 символов")
      .regex(
        /^[a-zA-Z0-9а-яА-Я]*$/,
        "Логин может содержать только буквы латиницы, буквы кириллицы и цифры"
      )
      .regex(
        /^[^!"№;%:?*]*$/,
        'Логин не может содержать специальные символы: !"№;%:?*'
      ),
    password: passwordSchema,
    confirmPassword: passwordSchema,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Пароли не совпадают",
    path: ["confirmPassword"],
  });
export type TFormLoginValues = z.infer<typeof formLoginSchema>;
export type TFormRegisterValues = z.infer<typeof formRegisterSchema>;

export const CheckoutScheme = z.object({
  name: z
    .string()
    .min(1, { message: "Имя обязателено для заполнения" })
    .regex(/^[a-zA-Zа-яА-Я]*$/, {
      message: "Имя может быть на Латинице или на Кириллице",
    }),
  surname: z
    .string()
    .min(1, { message: "Фамилия обязателена для заполнения" })
    .regex(/^[a-zA-Zа-яА-Я]*$/, {
      message: "Фамилия может быть на Латинице или на Кириллице",
    }),
  number: z
    .string()
    .min(1, { message: "Телефон обязателен для заполнения" })
    .regex(/^\+7 \d{3} \d{3} \d{2} \d{2}$/, {
      message: "Телефон должен быть в формате +7 777 777 77 77",
    }),
  address: z
    .string()
    .min(1, { message: "Адрес обязателен для заполнения" })
    .regex(/^г\.[А-Яа-я]+, ул\.[А-Яа-я]+ \d+, кв\.\d+$/, {
      message:
        "Адрес должен быть в формате 'г.Город, ул.Улица Номер, кв.Номер'",
    }),
});

export type TCheckoutScheme = z.infer<typeof CheckoutScheme>;
