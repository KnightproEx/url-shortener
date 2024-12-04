import { ColorModeProvider } from "@/components/ui/color-mode";
import { queryClient } from "@/ui/queries/client";
import router from "@/ui/router/router";
import { ChakraProvider } from "@chakra-ui/react";
import { QueryClientProvider } from "@tanstack/react-query";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { system } from "./config/theme";

// biome-ignorelint/style/noNonNullAssertion: <explanation>
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ChakraProvider value={system}>
        <ColorModeProvider>
          <RouterProvider router={router} />
          <ToastContainer pauseOnHover={false} />
        </ColorModeProvider>
      </ChakraProvider>
    </QueryClientProvider>
  </StrictMode>,
);
