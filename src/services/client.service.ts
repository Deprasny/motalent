import { BaseResponse } from '@/interfaces/global.interface';
import { RequestAdapter } from './request-adapter.service';
import { UpdateClientRegistrationBody } from '@/interfaces/client.interface';

export class ClientService extends RequestAdapter {
    constructor() {
        super();
    }

    public async updateRegistration(
        body: UpdateClientRegistrationBody
    ): Promise<string> {
        try {
            const response = await this.sendPutRequest<
                UpdateClientRegistrationBody,
                string
            >('/client/update-client-registration', body);

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
