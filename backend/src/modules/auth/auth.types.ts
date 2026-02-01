export interface RegisterRequest{
    email: string;
    password:string;
}
export interface LoginRequest{
    email:string;
    password:string;
}
export interface AuthResponse{
    userId:string;
    accessToken:string;
    refreshToken:string;
}