import { ENV_CONFIG } from '@/lib/env-config';
import axios, {
    AxiosInstance,
    AxiosRequestConfig,
    AxiosResponse,
    CreateAxiosDefaults,
    InternalAxiosRequestConfig
} from 'axios';
import { getSession } from 'next-auth/react';

interface RequestAdapterProps extends CreateAxiosDefaults {}

export class RequestAdapter {
    public adapter: AxiosInstance;

    constructor(props?: RequestAdapterProps) {
        const { baseURL = ENV_CONFIG.API_URL, ...rest } = props || {};

        this.adapter = axios.create({
            baseURL,
            ...rest
        });

        this.adapter.interceptors.request.use(this.interceptRequest);
        this.adapter.interceptors.response.use(this.interceptResponse);
    }

    private async interceptRequest(
        config: InternalAxiosRequestConfig
    ): Promise<InternalAxiosRequestConfig> {
        {
            const session = await getSession();

            if (session) {
                console.log('TOKENNNNN', {
                    session
                });
                config.headers.Authorization = `Bearer ${session.accessToken}`;
            }

            return config;
        }
    }

    private interceptResponse(
        response: AxiosResponse
    ): AxiosResponse | Promise<AxiosResponse> {
        {
            return response;
        }
    }

    public sendGetRequest<T>(
        url: string,
        params?: AxiosRequestConfig['params'],
        config?: AxiosRequestConfig
    ): Promise<AxiosResponse<T>> {
        return this.adapter.get<T, AxiosResponse<T>>(url, {
            ...config,
            params
        });
    }

    public sendPostRequest<B, T>(
        url: string,
        data?: B,
        config?: InternalAxiosRequestConfig
    ): Promise<AxiosResponse<T>> {
        return this.adapter.post<B, AxiosResponse<T>>(url, data, config);
    }

    public sendPutRequest<B, T>(
        url: string,
        data?: B,
        config?: InternalAxiosRequestConfig
    ): Promise<AxiosResponse<T>> {
        return this.adapter.put<B, AxiosResponse<T>>(url, data, config);
    }

    public sendPatchRequest<B, T>(
        url: string,
        data?: B,
        config?: InternalAxiosRequestConfig
    ): Promise<AxiosResponse<B>> {
        return this.adapter.patch<T, AxiosResponse<B>>(url, data, config);
    }

    public sendDeleteRequest<T>(
        url: string,
        config?: InternalAxiosRequestConfig
    ): Promise<AxiosResponse<T>> {
        return this.adapter.delete<T, AxiosResponse<T>>(url, config);
    }
}
