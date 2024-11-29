import elysiaSwagger from "@elysiajs/swagger";

const swagger = () =>
  elysiaSwagger({
    autoDarkMode: false,
    scalarConfig: { theme: "moon" },
    documentation: {
      tags: [
        { name: "Auth", description: "Auth endpoints" },
        { name: "Short Url", description: "Short Url endpoints" },
        { name: "User", description: "User endpoints" },
      ],
    },
  });

export default swagger;
