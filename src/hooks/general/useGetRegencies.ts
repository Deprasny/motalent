import { useQuery } from '@tanstack/react-query';

import { Regency } from '@/interfaces/general-service.interface';
import { SelectOption } from '@/interfaces/global.interface';
import { GeneralService } from '@/services/general.service';

export function useQueryGetRegencies(provinceId: string) {
    const generalService = new GeneralService();

    return useQuery<Regency[], any, SelectOption[]>({
        queryKey: ['getRegencies', provinceId],
        queryFn: () => generalService.getRegencies(provinceId),
        select: (data) =>
            data.map((province) => ({
                label: province.name,
                value: province.id
            })),
        enabled: !!provinceId,
        initialData: []
    });
}
