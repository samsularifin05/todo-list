import { Button, cn, FormPanel, RenderField } from "@/shared";
import { Link, Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "@/app";
import { registerAction } from "../../service";
import * as yup from "yup";

const validateRegisterScema = yup.object().shape({
  username: yup.string().required("Username is required"),
  email: yup.string().required("email is required"),
  password: yup.string().required("Password is required")
});

const Form = () => {
  const utility = useAppSelector((state) => state.utility);
  const theme = useAppSelector((state) => state.theme);
  const formValues = useAppSelector((state) => state.form.RegisterFom);

  const dispatch = useDispatch<AppDispatch>();

  function onSubmit() {
    dispatch(registerAction());
  }

  if (theme.getIsLogin) {
    return <Navigate to={"/admin/todolist"} />;
  }

  return (
    <div className={cn("grid gap-6")}>
      <FormPanel
        formName={"RegisterFom"}
        onSubmit={onSubmit}
        validate={validateRegisterScema}
        initialValues={formValues}
      >
        {({ form }) => (
          <>
            <div className="grid gap-2">
              <RenderField
                control={form.control}
                label="Username"
                placeholder="Masukan Username"
                name="username"
              />
              <RenderField
                control={form.control}
                label="Email"
                placeholder="Masukan Email"
                name="email"
              />

              <RenderField
                control={form.control}
                label="Password"
                placeholder="Masukan Password"
                name="password"
                hiddenText
              />
              <Button
                type="submit"
                className="mt-2"
                loading={utility.getLoading.button}
              >
                Login
              </Button>
            </div>
          </>
        )}
      </FormPanel>
      <div className="flex justify-center">
        Sudah punya akun ? &nbsp;<Link to="/"> Login </Link>
      </div>
    </div>
  );
};

export default Form;
