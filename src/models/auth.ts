export type RoleEnumDTO = "ROLE_ADMIN" | "ROLE_CLIENT";

export type CredentialsDTO = {
  username: string;
  password: string;
};

export type AccessTokenPayLoadDTO = {
  exp: number;
  user_name: string;
  authorities: RoleEnumDTO[];
};
