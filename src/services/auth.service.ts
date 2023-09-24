import { User } from 'next-auth';

import { RequestAdapter } from './request-adapter.service';

import {
    SignInResponse,
    SignUpRequestBody,
    SignUpResponse,
    UpdateProfileRequestBody
} from '@/interfaces/auth.interface';
import { BaseResponse } from '@/interfaces/global.interface';

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

    public async updateProfile(
        body: UpdateProfileRequestBody
    ): Promise<string> {
        try {
            const response = await this.sendPutRequest<
                UpdateProfileRequestBody,
                string
            >('/auth/update-profile', body);

            return response.data;
        } catch (error: any) {
            if (error.response) {
                console.log(error.response.data);
                return error.response.data.message;
            }
            throw error;
        }
    }
}
