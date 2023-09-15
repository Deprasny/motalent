import { QueryKey, useQuery } from '@tanstack/react-query';

import { GeneralService } from '@/services/general.service';
import { Province } from '@/interfaces/general-service.interface';
import { SelectOption } from '@/interfaces/global.interface';

export function useQueryGetProvinces(queryKey?: QueryKey) {
    const generalService = new GeneralService();

    return useQuery<Province[], any, SelectOption[]>({
        queryKey: queryKey || ['provinces'],
        queryFn: () => generalService.getProvinces(),
        select: (data) =>
            data.map((province) => ({
                label: province.name,
                value: province.id
            }))
    });
}
