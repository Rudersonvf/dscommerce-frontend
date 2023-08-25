import QueryString from "qs";
import {
  AccessTokenPayLoadDTO,
  CredentialsDTO,
  RoleEnum,
} from "../models/auth";
import { CLIENT_ID, CLIENT_SECRET } from "../utils/system";
import { AxiosRequestConfig } from "axios";
import { requestBackend } from "../utils/requests";
import * as accessTokenRepository from "../localstorage/access-token-repository";
import jwtDecode from "jwt-decode";

export function loginRequest(loginData: CredentialsDTO) {
  const headers = {
    "Content-Type": "application/x-www-form-urlencoded",
    Authorization: "Basic " + window.btoa(CLIENT_ID + ":" + CLIENT_SECRET),
  };

  const requestBody = QueryString.stringify({
    ...loginData,
    grant_type: "password",
  });

  const config: AxiosRequestConfig = {
    method: "POST",
    url: "/oauth/token",
    data: requestBody,
    headers,
  };

  return requestBackend(config);
}

export function logout() {
  accessTokenRepository.remove();
}

export function saveAccessToken(token: string) {
  accessTokenRepository.save(token);
}

export function getAccessToken() {
  return accessTokenRepository.get();
}

export function getAccessTokenPayLoad(): AccessTokenPayLoadDTO | undefined {
  try {
    const token = accessTokenRepository.get();
    return token == null
      ? undefined
      : (jwtDecode(token) as AccessTokenPayLoadDTO);
  } catch (error) {
    return undefined;
  }
}

export function isAuthenticated(): boolean {
  let tokenPayLoad = getAccessTokenPayLoad();
  return tokenPayLoad && tokenPayLoad.exp * 1000 > Date.now() ? true : false;
}

export function hasAnyRoles(roles: RoleEnum[]): boolean {
  if (roles.length === 0) {
    return true;
  }

  const tokenPayLoad = getAccessTokenPayLoad();

  if (tokenPayLoad !== undefined) {
    for (var i = 0; i < roles.length; i++) {
      if (tokenPayLoad.authorities.includes(roles[i])) {
        return true;
      }
    }
    //return roles.some((role) => tokenData.authorities.includes(role)); <- Função de alta ordem, equivalente a função acima
  }
  return false;
}
