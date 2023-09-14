import { useQuery } from '@tanstack/react-query';

import { Village } from '@/interfaces/general-service.interface';
import { SelectOption } from '@/interfaces/global.interface';
import { GeneralService } from '@/services/general.service';

export function useQueryGetVillages(districtId: string) {
    const generalService = new GeneralService();

    return useQuery<Village[], any, SelectOption[]>({
        queryKey: ['getVillages', districtId],
        queryFn: () => generalService.getVillages(districtId),
        select: (data) =>
            data.map((province) => ({
                label: province.name,
                value: province.id
            })),
        enabled: !!districtId,
        initialData: []
    });
}
