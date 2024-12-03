import { Field } from "@/components/ui/field";
import { PasswordInput } from "@/components/ui/password-input";
import {
  ProgressCircleRing,
  ProgressCircleRoot,
} from "@/components/ui/progress-circle";
import {
  Box,
  Button,
  Container,
  Heading,
  Input,
  Stack,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { type SubmitHandler, useForm } from "react-hook-form";
import { type LoginInput, loginSchema, useLogin } from "./login-query";

const LoginPage = () => {
  const { mutate: login, isPending } = useLogin();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });
  const handleLogin: SubmitHandler<LoginInput> = (data) => {
    if (isPending) return;
    login(data);
  };

  return (
    <Container
      maxW="lg"
      py={{ base: "12", md: "24" }}
      px={{ base: "0", sm: "8" }}
    >
      <Stack gap="4">
        <Stack align="center">
          <Heading>Log in to your account</Heading>
        </Stack>
        <Box
          py={{ base: "0", sm: "8" }}
          px={{ base: "4", sm: "10" }}
          bg={{ base: "transparent", sm: "bg.surface" }}
          boxShadow={{ base: "none", sm: "md" }}
          borderRadius={{ base: "none", sm: "xl" }}
        >
          <form onSubmit={(e) => void handleSubmit(handleLogin)(e)}>
            <Stack gap="6">
              <Stack gap="5">
                <Field
                  label="Username"
                  invalid={!!errors.username}
                  errorText={errors.username?.message}
                >
                  <Input {...register("username")} />
                </Field>
                <Field
                  label="Password"
                  invalid={!!errors.username}
                  errorText={errors.username?.message}
                >
                  <PasswordInput {...register("password")} />
                </Field>
              </Stack>
              {isPending ? (
                <ProgressCircleRoot value={null}>
                  <ProgressCircleRing cap="round" />
                </ProgressCircleRoot>
              ) : (
                <Button
                  w="full"
                  _hover={{
                    transform: "translateY(-2px)",
                    boxShadow: "lg",
                  }}
                  type="submit"
                >
                  Sign in
                </Button>
              )}
            </Stack>
          </form>
        </Box>
      </Stack>
    </Container>
  );
};

export default LoginPage;
