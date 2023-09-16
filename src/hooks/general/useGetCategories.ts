import { QueryKey, useQuery } from '@tanstack/react-query';

import { Category } from '@/interfaces/general-service.interface';
import { BaseResponse, SelectOptions } from '@/interfaces/global.interface';
import { GeneralService } from '@/services/general.service';

export function useGetCategories(enabled = true, queryKey?: QueryKey) {
    const generalService = new GeneralService();

    return useQuery<BaseResponse<Category[]>, Error, SelectOptions>({
        queryKey: queryKey || ['categories'],
        queryFn: () => generalService.getCategories(),
        select: ({ data }) =>
            data.map(({ name, id }) => ({
                label: name,
                value: id.toString()
            })),
        enabled
    });
}
