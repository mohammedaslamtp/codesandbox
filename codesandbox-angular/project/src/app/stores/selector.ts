import { createSelector } from '@ngrx/store';
import { appStateInterface } from '../types/appState';
import { Templates } from '../types/template_types';

// login selector:
export let selectFeature = (state: appStateInterface) => state.loginData;
export const log_loadingSelector = createSelector(
  selectFeature,
  (state) => state?.isLoading
);
export const log_dataSelector = createSelector(selectFeature, (state) => {
  return state?.data;
});
export const log_errorSelector = createSelector(selectFeature, (state) => {
  return state?.error;
});

// register/signup selector:
selectFeature = (state: appStateInterface) => state.registerData;
export const reg_loadingSelector = createSelector(
  selectFeature,
  (state) => state?.isLoading
);
export const reg_dataSelector = createSelector(selectFeature, (state) => {
  return state?.data;
});
export const reg_errorSelector = createSelector(selectFeature, (state) => {
  return state?.error;
});

// otp generating selector:
selectFeature = (state: appStateInterface) => state.otp;
export const otp_loadingSelector = createSelector(
  selectFeature,
  (state) => state?.isLoading
);
export const otp_dataSelector = createSelector(selectFeature, (state) => {
  return state?.data;
});
export const otp_errorSelector = createSelector(selectFeature, (state) => {
  return state?.error;
});

// search result selector:
selectFeature = (state: appStateInterface) => state.search;
export const search_loadingSelector = createSelector(
  selectFeature,
  (state) => state?.isLoading
);
export const search_resultSelector = createSelector(selectFeature, (state) => {
  return state?.data;
});
export const search_errorSelector = createSelector(selectFeature, (state) => {
  return state?.error;
});