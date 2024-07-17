import {
  FormLoginDto,
  FormRegisterDto,
  intitalFormLogin,
  intitalFormRegister
} from "@/pages";
import {
  FormInputTodoList,
  intitalFormInputTodoList
} from "@/pages/admin/todoList";

export interface FormState {
  LoginForm: FormLoginDto;
  RegisterFom: FormRegisterDto;
  FormTodoList: FormInputTodoList;
}

export const initialState: FormState = {
  LoginForm: intitalFormLogin,
  RegisterFom: intitalFormRegister,
  FormTodoList: intitalFormInputTodoList
};
