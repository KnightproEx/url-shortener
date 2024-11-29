import { type Secret, type SignOptions, sign, verify } from "jsonwebtoken";
import { config } from "./env";

export interface JwtPayload {
  iat: number;
  exp: number;
  sub: string;
}

// TODO: Optimize this
const signJwt = (privateKey: Secret, options: SignOptions = {}) => {
  return sign({}, privateKey, options);
};

export const signTokens = (sub: string) => {
  const accessTokenExpiresIn = 60 * config.accessToken.expiresIn;
  const refreshTokenExpiresIn = 60 * config.refreshToken.expiresIn;

  const accessToken = signJwt(config.accessToken.secret, {
    subject: sub,
    expiresIn: accessTokenExpiresIn,
  });

  const refreshToken = signJwt(config.refreshToken.secret, {
    subject: sub,
    expiresIn: refreshTokenExpiresIn,
  });

  return {
    access_token: accessToken,
    refresh_token: refreshToken,
    access_token_expires_in: accessTokenExpiresIn,
    refresh_token_expires_in: refreshTokenExpiresIn,
  };
};

// TODO: Optimize this
export const verifyAccessToken = (token: string) => {
  try {
    return verify(token, config.accessToken.secret) as JwtPayload;
  } catch {
    return;
  }
};

export const verifyRefreshToken = (token: string) => {
  try {
    return verify(token, config.refreshToken.secret) as JwtPayload;
  } catch {
    return;
  }
};
