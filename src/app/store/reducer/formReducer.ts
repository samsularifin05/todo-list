import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FormState, initialState } from "../model";

const formsSlice = createSlice({
  name: "forms",
  initialState,
  reducers: {
    updateForm: <T extends keyof FormState>(
      state: FormState,
      action: PayloadAction<{ form: T; values: Partial<FormState[T]> }>
    ) => {
      const { form, values } = action.payload;

      const validValues = Object.keys(values).reduce((acc, key) => {
        if (key in state[form]) {
          acc[key as keyof FormState[T]] = values[key as keyof FormState[T]];
        }
        return acc;
      }, {} as Partial<FormState[T]>);

      state[form] = { ...state[form], ...validValues };
    },
    resetForm: <T extends keyof FormState>(
      state: FormState,
      action: PayloadAction<keyof FormState>
    ) => {
      const form = action.payload as T;
      state[form] = { ...initialState[form] };
    }
  }
});

export const { updateForm, resetForm } = formsSlice.actions;
export const formActions = {
  updateForm,
  resetForm
};
export default formsSlice.reducer;
