export interface User {
  _id: string;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserWithoutPassword {
  _id: string;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignupRequest {
  name: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  user: UserWithoutPassword;
  token: string;
}

export interface JWTPayload {
  userId: string;
  email: string;
  name: string;
}

export interface PredictionHistory {
  _id: string;
  userId: string;
  type: 'disease' | 'soil' | 'fertilizer';
  input: any;
  result: any;
  imageUrl?: string;
  createdAt: Date;
}
