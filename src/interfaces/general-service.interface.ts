export interface Province {
    id: number;
    name: string;
}

export interface Regency extends Province {
    province_id: number;
}

export interface District extends Omit<Regency, 'province_id'> {
    regency_id: number;
}

export interface Village extends Omit<District, 'regency_id'> {
    district_id: number;
}
