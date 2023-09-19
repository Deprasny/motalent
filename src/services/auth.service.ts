import { BaseResponse } from '@/interfaces/global.interface';
import { RequestAdapter } from './request-adapter.service';
import {
    SignInResponse,
    SignUpResponse,
    SignUpRequestBody
} from '@/interfaces/auth.interface';
import { User } from 'next-auth';
import { parseArrayErrorMessage } from '@/lib/error-parser';

export class AuthService extends RequestAdapter {
    constructor() {
        super();
    }

    public async login(email: string, password: string): Promise<string> {
        try {
            const { data } = await this.sendPostRequest<
                {
                    email: string;
                    password: string;
                },
                BaseResponse<SignInResponse>
            >('/auth/sign-in', {
                email,
                password
            });

            return data?.data?.access_token;
        } catch (error) {
            throw error;
        }
    }

    public async register({
        name,
        email,
        password,
        password_confirmation
    }: SignUpRequestBody) {
        try {
            const { data } = await this.sendPostRequest<
                SignUpRequestBody,
                BaseResponse<SignUpResponse>
            >('/auth/sign-up', {
                name,
                email,
                password,
                password_confirmation
            });

            return data?.data.access_token;
        } catch (error: any) {
            if (error.response.data) {
                throw parseArrayErrorMessage(
                    error.response.data.errors.message
                );
            }

            throw error;
        }
    }

    public async getProfile(token?: string): Promise<User> {
        try {
            const { data } = await this.sendGetRequest<BaseResponse<User>>(
                '/auth/profile',
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            return data?.data;
        } catch (error) {
            throw error;
        }
    }
}
