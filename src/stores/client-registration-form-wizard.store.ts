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
    province_id: string | null;
    city_id: string | null;
    district_id: string | null;
}

interface ClientLocationFormStore extends ClientLocationFormState {}

interface ClientSeachPreferenceFormState {
    category_ids: string[] | null;
    province_ids: string[] | null;
    city_ids: string[] | null;
    district_ids: string[] | null;
    min_price: number | null;
    max_price: number | null;
    min_age: number | null;
    max_age: number | null;
    is_negotiable: boolean | null;
    is_dp: boolean | null;
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
        address: undefined,
        age: undefined,
        blood_type: undefined,
        dob: undefined,
        gender: undefined,
        name: undefined
    },
    locationState: {
        city_id: null,
        district_id: null,
        province_id: null
    },
    preferenceState: {
        category_ids: null,
        city_ids: null,
        district_ids: null,
        is_dp: false,
        is_negotiable: false,
        max_age: null,
        max_price: null,
        min_age: null,
        min_price: null,
        province_ids: null
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
                set((prev) => ({
                    locationState: {
                        ...prev.locationState,
                        ...state
                    }
                })),
            setProfileForm: (state) =>
                set((prev) => ({
                    ...prev,
                    profileState: {
                        ...prev.profileState,
                        ...state
                    }
                })),
            setSearchPreferenceForm: (state) =>
                set((prev) => ({
                    ...prev,
                    preferenceState: {
                        ...prev.preferenceState,
                        ...state
                    }
                }))
        };
    });
