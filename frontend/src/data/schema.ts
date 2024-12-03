import { coerce, number, preprocess, string } from "zod";

export const numberType = (params?: { optional?: boolean }) =>
  params?.optional
    ? coerce.number({ invalid_type_error: "Invalid number" })
    : preprocess(
        (e) => {
          const value = Number.parseInt(
            coerce.number().safeParse(e).data?.toString() ?? "",
          );
          return e ? value : undefined;
        },
        number({
          invalid_type_error: "Invalid number",
          required_error: "*required field",
        }),
      );

export const stringType = () => string().min(1, "*required field");

export const intType = () =>
  coerce
    .number({ required_error: "*required field", message: "Invalid number" })
    .int();
