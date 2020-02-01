export interface SetUserPayload {
  user: object;
};

export interface SetTokenPayload {
  token: string;
};

export interface AuthState {
  user: any | null;
  token: string | null;
}
