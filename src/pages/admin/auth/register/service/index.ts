import { AppDispatch, AppThunk, utilityActions } from "@/app";
import {
  ToastNotificationInfo,
  apiInstance,
  timoutDelay,
  urlApi
} from "@/shared";

export const registerAction = (): AppThunk => {
  return async (dispatch: AppDispatch, getState) => {
    const state = getState();
    const formValues = state.form.RegisterFom;
    dispatch(utilityActions.setLoading({ screen: true }));
    try {
      dispatch(utilityActions.setLoading({ screen: true }));
      await apiInstance.post(urlApi.register, formValues);
      ToastNotificationInfo("Register Berhasil");
      timoutDelay(4000);
      window.location.href = "/";
      dispatch(utilityActions.stopLoading());
    } catch (error) {
      dispatch(utilityActions.stopLoading());
      ToastNotificationInfo(`${error}`);
    }
  };
};
