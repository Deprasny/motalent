import { useQuery } from '@tanstack/react-query';

import { District } from '@/interfaces/general-service.interface';
import { SelectOption } from '@/interfaces/global.interface';
import { GeneralService } from '@/services/general.service';

export function useQueryGetDistricts(regencyId: string) {
    const generalService = new GeneralService();

    return useQuery<District[], any, SelectOption[]>({
        queryKey: ['getDistricts', regencyId],
        queryFn: () => generalService.getDistricts(regencyId),
        select: (data) =>
            data.map((province) => ({
                label: province.name,
                value: province.id
            })),
        enabled: !!regencyId,
        initialData: []
    });
}
