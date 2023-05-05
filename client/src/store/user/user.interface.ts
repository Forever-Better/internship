export interface UserState {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  image: string;
}

export interface Tokens {
  accessToken: string;
  refreshToken: string;
}

export interface InitialState {
  user: UserState | null;
  isLoading: boolean;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface SignupData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface AuthResponse extends Tokens {
  user: UserState;
}
