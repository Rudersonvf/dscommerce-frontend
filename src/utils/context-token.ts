import { createContext } from "react";
import { AccessTokenPayLoadDTO } from "../models/auth";

export type ContextTokenType = {
  contextTokenPayload: AccessTokenPayLoadDTO | undefined;
  setContextTokenPayload: (
    accessTokenPayLoad: AccessTokenPayLoadDTO | undefined
  ) => void;
};

export const ContextToken = createContext<ContextTokenType>({
  contextTokenPayload: undefined,
  setContextTokenPayload: () => {},
});
