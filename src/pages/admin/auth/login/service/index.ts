import { AppDispatch, AppThunk, themesActions, utilityActions } from "@/app";
import { ResponseLoginDto } from "../model";
import {
  ToastNotificationInfo,
  apiInstance,
  timoutDelay,
  urlApi
} from "@/shared";
import { setItem } from "@/shared";

export const loginAction = (): AppThunk => {
  return async (dispatch: AppDispatch, getState) => {
    const state = getState();
    const formValues = state.form.LoginForm;
    dispatch(utilityActions.setLoading({ screen: true }));
    try {
      dispatch(utilityActions.setLoading({ screen: true }));
      const result = await apiInstance.post<ResponseLoginDto>(
        urlApi.auth,
        formValues
      );
      setItem("userdata", result.data);
      timoutDelay(300);
      dispatch(themesActions.setIsLogin(true));
      dispatch(utilityActions.stopLoading());
    } catch (error) {
      dispatch(utilityActions.stopLoading());
      ToastNotificationInfo(`${error}`);
    }
  };
};
