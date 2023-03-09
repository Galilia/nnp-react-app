import { StateSchema } from 'app/providers/StoreProvider';

export const getProfileError = (state: StateSchema) => state.profile?.error;

export const getProfileIsLoading = (state: StateSchema) => state.profile?.isLoading;

export const getProfileData = (state: StateSchema) => state.profile?.data;

export const getProfileForm = (state: StateSchema) => state.profile?.form;

export const getProfileReadonly = (state: StateSchema) => state.profile?.readonly;