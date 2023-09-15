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

interface ClientSeachPreferenceFormStore
    extends ClientSeachPreferenceFormState {}

interface UseClientRegistrationFormWizardStore {
    profileState: ClientProfileFormStore;
    locationState: ClientLocationFormStore;
    preferencesState: ClientSeachPreferenceFormStore[];

    isValidProfile: boolean;
    isValidLocation: boolean;
    isValidPreference: boolean;

    collapsibleIndexs: number[];

    setProfileForm: (state: Partial<ClientProfileFormState>) => void;
    setSearchPreferencesForm: (
        index: number,
        state: Partial<ClientSeachPreferenceFormState>
    ) => void;
    setLocationForm: (state: Partial<ClientLocationFormState>) => void;
    setIsValidProfile: (bool: boolean) => void;
    setIsValidLocation: (bool: boolean) => void;
    setIsValidPreference: (bool: boolean) => void;
    setPushPreferencesForm: (state: ClientSeachPreferenceFormState) => void;
    setRemovePreferencesForm: (index: number) => void;
    toggleCollapsible: (index: number) => void;
}

export const INITIAL_PREF_STATE: ClientSeachPreferenceFormState = {
    category_ids: '',
    regency_id: '',
    district_id: '',
    village_id: '',
    is_dp: false,
    is_negotiable: false,
    max_age: 0,
    max_price: 0,
    min_age: 0,
    min_price: 0,
    province_id: ''
};

export const INITIAL_STATE: UseClientRegistrationFormWizardStore = {
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
    preferencesState: [],
    isValidProfile: false,
    setIsValidProfile: (value) => {},

    isValidLocation: false,
    setIsValidLocation: (value) => {},

    isValidPreference: false,
    setIsValidPreference: (value) => {},

    setProfileForm: (state) => {},
    setLocationForm: (state) => {},
    setSearchPreferencesForm: (index, payload) => {},
    setPushPreferencesForm: (state) => {},
    setRemovePreferencesForm: (index) => {},

    collapsibleIndexs: [],
    toggleCollapsible: (index) => {}
};

export const useClientRegistrationFormWizard =
    create<UseClientRegistrationFormWizardStore>((set, get) => {
        return {
            locationState: INITIAL_STATE.locationState,
            preferencesState: INITIAL_STATE.preferencesState,
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
            setSearchPreferencesForm: (index, preference) => {
                const oldPreferences = get().preferencesState;
                const updatedPreferences = oldPreferences.map((pref, i) => {
                    if (i === index) {
                        return {
                            ...pref,
                            ...preference
                        };
                    }
                    return pref;
                });

                set({
                    preferencesState: updatedPreferences
                });
            },
            setPushPreferencesForm: (state) => {
                const oldPreferences = get().preferencesState;
                const updatedPreferences = [...oldPreferences, state];

                set({
                    preferencesState: updatedPreferences
                });
            },
            setRemovePreferencesForm: (index) => {
                const oldPreferences = get().preferencesState;
                const updatedPreferences = oldPreferences.filter(
                    (_, i) => i !== index
                );

                set({
                    preferencesState: updatedPreferences
                });
            },

            collapsibleIndexs: [],
            toggleCollapsible: (index) => {
                set((prev) => {
                    const updatedCollapsibles = [...prev.collapsibleIndexs];
                    const isExist = updatedCollapsibles.includes(index);

                    if (isExist) {
                        const filteredCollapsibles = updatedCollapsibles.filter(
                            (i) => i !== index
                        );
                        return {
                            ...prev,
                            collapsibleIndexs: filteredCollapsibles
                        };
                    }

                    updatedCollapsibles.push(index);

                    return {
                        ...prev,
                        collapsibleIndexs: updatedCollapsibles
                    };
                });
            }
        };
    });
