import { create } from 'zustand';

export interface ClientProfileFormState {
    name?: string;
    age?: string;
    dob?: Date;
    address?: string;
    blood_type?: string;
    gender?: string;
}

interface ClientProfileFormStore extends ClientProfileFormState {}

interface ClientLocationFormState {
    province_id: string;
    regency_id: string;
    village_id: string;
    district_id: string;
}

interface ClientLocationFormStore extends ClientLocationFormState {}

interface ClientSeachPreferenceFormState {
    category_ids: string;
    province_ids: string;
    city_ids: string;
    district_id: string;
    min_price: number;
    max_price: number;
    min_age: number;
    max_age: number;
    is_negotiable: boolean;
    is_dp: boolean;
}

interface ClientSeachPreferenceFormStore
    extends ClientSeachPreferenceFormState {}

interface UseClientRegistrationFormWizardStore {
    profileState: ClientProfileFormStore;
    locationState: ClientLocationFormStore;
    preferenceState: ClientSeachPreferenceFormStore;

    isValidProfile: boolean;
    isValidLocation: boolean;
    isValidPreference: boolean;

    setProfileForm: (state: Partial<ClientProfileFormState>) => void;
    setSearchPreferenceForm: (
        state: Partial<ClientSeachPreferenceFormState>
    ) => void;
    setLocationForm: (state: Partial<ClientLocationFormState>) => void;
    setIsValidProfile: (bool: boolean) => void;
    setIsValidLocation: (bool: boolean) => void;
    setIsValidPreference: (bool: boolean) => void;
}

const INITIAL_STATE: UseClientRegistrationFormWizardStore = {
    profileState: {
        address: '',
        age: '',
        blood_type: '',
        dob: undefined,
        gender: '',
        name: ''
    },
    locationState: {
        province_id: '',
        regency_id: '',
        district_id: '',
        village_id: ''
    },
    preferenceState: {
        category_ids: '',
        city_ids: '',
        district_id: '',
        is_dp: false,
        is_negotiable: false,
        max_age: 0,
        max_price: 0,
        min_age: 0,
        min_price: 0,
        province_ids: ''
    },
    isValidProfile: false,
    setIsValidProfile: (value) => {},

    isValidLocation: false,
    setIsValidLocation: (value) => {},

    isValidPreference: false,
    setIsValidPreference: (value) => {},

    setProfileForm: (state) => {},
    setLocationForm: (state) => {},
    setSearchPreferenceForm: (payload) => {}
};

export const useClientRegistrationFormWizard =
    create<UseClientRegistrationFormWizardStore>((set, get) => {
        return {
            locationState: INITIAL_STATE.locationState,
            preferenceState: INITIAL_STATE.preferenceState,
            profileState: INITIAL_STATE.profileState,
            isValidLocation: INITIAL_STATE.isValidLocation,
            isValidPreference: INITIAL_STATE.isValidPreference,
            isValidProfile: INITIAL_STATE.isValidProfile,
            setIsValidLocation: (v) =>
                set({
                    isValidLocation: v
                }),
            setIsValidPreference: (v) =>
                set({
                    isValidPreference: v
                }),
            setIsValidProfile: (v) =>
                set({
                    isValidProfile: v
                }),
            setLocationForm: (state) =>
                set({
                    locationState: {
                        ...get().locationState,
                        ...state
                    }
                }),
            setProfileForm: (state) =>
                set({
                    profileState: {
                        ...get().profileState,
                        ...state
                    }
                }),
            setSearchPreferenceForm: (state) =>
                set({
                    preferenceState: {
                        ...get().preferenceState,
                        ...state
                    }
                })
        };
    });
