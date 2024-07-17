import { Button, cn, FormPanel, RenderField } from "@/shared";
import { Link, Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "@/app";
import { validRegisterSchema } from "./validate";
import { registerAction } from "../../service";

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
        validate={validRegisterSchema}
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
