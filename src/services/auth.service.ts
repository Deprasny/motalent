import { BaseResponse } from '@/interfaces/global.interface';
import { RequestAdapter } from './request-adapter.service';
import { SignInResponse } from '@/interfaces/auth.interface';
import { User } from 'next-auth';

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
