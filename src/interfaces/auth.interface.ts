export interface SignInResponse {
    access_token: string;
}

export interface SignUpResponse extends SignInResponse {
    message: string;
}

export interface SignUpRequestBody {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
}
