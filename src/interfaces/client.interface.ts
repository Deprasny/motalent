export interface UpdateClientRegistrationBody {
    client_id: number;
    profile: {
        name: string;
        age: number;
        dob: string;
        address: string;
        blood_type: string;
        gender: 'male' | 'female'; // Update with possible gender values
    };
    location: {
        province_id: string;
        regency_id: string;
        district_id: string;
        village_id: string;
    };
    search_preferences: SearchPreference[];
}

interface SearchPreference {
    category_ids: string[];
    province_id: string;
    regency_id: string;
    district_id: string;
    village_id: string;
    min_price: number;
    max_price: number;
    min_age: number;
    max_age: number;
    is_negotiable: boolean;
    is_dp: boolean;
}

export interface UpdateClientRequestBody {
    name: string;
    bio: string;
    dob: string;
    address: string;
    gender: string;
    blood_type: string;
    province_id: string;
    regency_id: string;
    district_id: string;
    village_id: string;
}
