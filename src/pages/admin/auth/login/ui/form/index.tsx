import { Button, cn, FormPanel, RenderField } from "@/shared";
import { Link, Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "@/app";
import { validLoginSchema } from "./validate";
import { loginAction } from "../../service";

const FormLogin = () => {
  const utility = useAppSelector((state) => state.utility);
  const theme = useAppSelector((state) => state.theme);
  const formValues = useAppSelector((state) => state.form.LoginForm);

  const dispatch = useDispatch<AppDispatch>();

  function onSubmit() {
    dispatch(loginAction());
  }

  if (theme.getIsLogin) {
    return <Navigate to={"/admin/todolist"} />;
  }

  return (
    <div className={cn("grid gap-6")}>
      <FormPanel
        formName={"LoginForm"}
        onSubmit={onSubmit}
        validate={validLoginSchema}
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
        Belum punya akun ? &nbsp;<Link to="/register"> Register </Link>
      </div>
    </div>
  );
};

export default FormLogin;
