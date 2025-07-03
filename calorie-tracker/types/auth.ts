export interface User {
  id: string
  first_name: string
  email: string
}

export interface AuthResponse {
  token: string
  user: User
}

export interface LoginData {
  email: string
  password: string
}

export interface RegisterData {
  first_name: string
  email: string
  password: string
}
