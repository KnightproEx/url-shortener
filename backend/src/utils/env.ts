const env = {
  accessTokenSecret: process.env.ACCESS_TOKEN_SECRET,
  accessTokenExpiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN,
  refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET,
  refreshTokenExpiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN,
};

export const config = {
  accessToken: {
    // biome-ignorelint/style/noNonNullAssertion: <explanation>
    secret: env.accessTokenSecret!,
    // biome-ignorelint/style/noNonNullAssertion: <explanation>
    expiresIn: Number(env.accessTokenExpiresIn!),
  },
  refreshToken: {
    // biome-ignorelint/style/noNonNullAssertion: <explanation>
    secret: env.refreshTokenSecret!,
    // biome-ignorelint/style/noNonNullAssertion: <explanation>
    expiresIn: Number(env.refreshTokenExpiresIn!),
  },
  isProduction: process.env.NODE_ENV === "production",
};

// TODO: Make it to be specific
export const ensureEnvLoaded = () => {
  const isEnvNotNull = Object.values(env).every((e) => e !== undefined);
  if (!isEnvNotNull) {
    throw "Environment variable is missing";
  }
  console.log("All environment variables are loaded");
};
