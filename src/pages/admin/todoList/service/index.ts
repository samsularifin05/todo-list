import { AppDispatch, AppThunk, formActions, utilityActions } from "@/app";
import { apiInstance, ToastNotificationSuccess, urlApi } from "@/shared";
import { ResponseTodoListDto } from "../model/response.dto";
import { setTodoList } from "../redux";

export const getDataTodolist = (): AppThunk => {
  return async (dispatch: AppDispatch) => {
    dispatch(utilityActions.setLoading({ screen: true }));
    try {
      const response = await apiInstance.get<ResponseTodoListDto[]>(
        urlApi.checklist
      );
      dispatch(setTodoList({ data: response.data }));
    } catch (error) {
      dispatch(setTodoList({ data: [] }));
    } finally {
      dispatch(utilityActions.stopLoading());
    }
  };
};

export const saveTodoList = (): AppThunk => {
  return async (dispatch: AppDispatch, getState) => {
    const state = getState();
    dispatch(utilityActions.setLoading({ screen: true }));
    const formValues = state.form.FormTodoList;

    try {
      await apiInstance.post(urlApi.checklist, {
        name: formValues.name
      });
      dispatch(getDataTodolist());
      ToastNotificationSuccess("Berhasil Di tambahkan");
      dispatch(formActions.resetForm("FormTodoList"));
    } catch (error) {
      dispatch(getDataTodolist());
    } finally {
      dispatch(utilityActions.stopLoading());
    }
  };
};
export const saveTodoListItems = (id: number): AppThunk => {
  return async (dispatch: AppDispatch, getState) => {
    const state = getState();
    dispatch(utilityActions.setLoading({ screen: true }));
    const formValues = state.form.FormTodoList;

    try {
      await apiInstance.post(urlApi.checklist + `/${id}/item`, {
        itemName: formValues.name
      });
      dispatch(getDataTodolist());
      reset(id);
      ToastNotificationSuccess("Berhasil Di tambahkan");
    } catch (error) {
      dispatch(getDataTodolist());
    } finally {
      dispatch(utilityActions.stopLoading());
    }
  };
};
export const hapusItemService = (id?: number, idItems?: number): AppThunk => {
  return async (dispatch: AppDispatch) => {
    dispatch(utilityActions.setLoading({ screen: true }));

    try {
      await apiInstance.delete(urlApi.checklist + `/${id}/item/${idItems}`);
      dispatch(getDataTodolist());
      reset(id, idItems);

      ToastNotificationSuccess("Berhasil Di dihapus");
    } catch (error) {
      dispatch(getDataTodolist());
    } finally {
      dispatch(utilityActions.stopLoading());
    }
  };
};
export const renameItems = (id?: number, idItems?: number): AppThunk => {
  return async (dispatch: AppDispatch, getState) => {
    dispatch(utilityActions.setLoading({ screen: true }));
    const state = getState();

    const formValues = state.form.FormTodoList;

    try {
      await apiInstance.put(
        urlApi.checklist + `/${id}/item/rename/${idItems}`,
        {
          itemName: formValues.name
        }
      );
      reset(id, idItems);
      dispatch(formActions.resetForm("FormTodoList"));
      dispatch(getDataTodolist());
      ToastNotificationSuccess("Berhasil Di rename");
    } catch (error) {
      dispatch(getDataTodolist());
    } finally {
      dispatch(utilityActions.stopLoading());
    }
  };
};

const reset = (id?: number, idItems?: number): void => {
  const checkbox = document.getElementById(
    `ceklis${idItems}`
  ) as HTMLInputElement;
  checkbox.checked = false;
  const checkboxItems = document.getElementById(
    `itemCeklis${id}`
  ) as HTMLInputElement;
  const nameId = document.getElementById("nameId") as HTMLInputElement;
  nameId.value = "";

  checkboxItems.checked = false;
};
