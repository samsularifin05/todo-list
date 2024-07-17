export interface FormRegisterDto {
  username: string;
  password: string;
  email: string;
}

export const intitalFormRegister: FormRegisterDto = {
  username: "",
  password: "",
  email: ""
};
