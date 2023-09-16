import {
    Category,
    District,
    Province,
    Regency,
    Village
} from '@/interfaces/general-service.interface';
import { RequestAdapter } from './request-adapter.service';
import { BaseResponse } from '@/interfaces/global.interface';

export class GeneralService extends RequestAdapter {
    constructor() {
        super();
    }

    public async getProvinces(): Promise<Province[]> {
        try {
            const { data } = await this.sendGetRequest<Province[]>(
                '/general/location/provinces'
            );

            return data;
        } catch (error) {
            throw error;
        }
    }

    public async getRegencies(provinceId: string): Promise<Regency[]> {
        try {
            const { data } = await this.sendGetRequest<Regency[]>(
                `/general/location/regencies`,
                {
                    province_id: String(provinceId)
                }
            );

            return data;
        } catch (error) {
            throw error;
        }
    }

    public async getDistricts(regencyId: string): Promise<District[]> {
        try {
            const { data } = await this.sendGetRequest<District[]>(
                `/general/location/districts`,
                {
                    regency_id: String(regencyId)
                }
            );

            return data;
        } catch (error) {
            throw error;
        }
    }

    public async getVillages(districtId: string): Promise<Village[]> {
        try {
            const { data } = await this.sendGetRequest<Village[]>(
                `/general/location/villages`,
                {
                    district_id: String(districtId)
                }
            );

            return data;
        } catch (error) {
            throw error;
        }
    }

    public async getCategories() {
        try {
            const { data } =
                await this.sendGetRequest<BaseResponse<Category[]>>(
                    `/general/categories`
                );

            return data;
        } catch (error) {
            throw error;
        }
    }
}
