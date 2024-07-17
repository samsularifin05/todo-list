import { Button, cn, FormPanel, RenderField } from "@/shared";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "@/app";
import { validateCreateTodoListSchema } from "./validate";
import {
  hapusItemService,
  renameItems,
  saveTodoList,
  saveTodoListItems
} from "../service";

interface Props {
  idSelected?: number | null;
  idSelectedPerent?: number | null;
}
const CreateTodoList = (props: Props) => {
  const { idSelected, idSelectedPerent } = props;
  const utility = useAppSelector((state) => state.utility);
  const formValues = useAppSelector((state) => state.form.FormTodoList);

  const dispatch = useDispatch<AppDispatch>();

  function onSubmit() {
    if (idSelected) {
      dispatch(saveTodoListItems(idSelected));
    } else {
      dispatch(saveTodoList());
    }
  }

  const hapusItem = () => {
    if (idSelected && idSelectedPerent) {
      dispatch(hapusItemService(idSelected, idSelectedPerent));
    }
  };
  const editItem = () => {
    if (idSelected && idSelectedPerent) {
      dispatch(renameItems(idSelected, idSelectedPerent));
    }
  };

  return (
    <div className={cn("grid gap-6")}>
      <FormPanel
        formName={"FormTodoList"}
        onSubmit={onSubmit}
        validate={validateCreateTodoListSchema}
        initialValues={formValues}
      >
        {({ form }) => (
          <>
            <div className="flex gap-4">
              <RenderField
                control={form.control}
                label=""
                id="nameId"
                placeholder="Masukan Name"
                name="name"
              />

              <Button
                type="submit"
                className="mt-1"
                disabled={idSelectedPerent && idSelected ? true : false}
                loading={utility.getLoading.button}
              >
                Simpan
              </Button>
              {idSelectedPerent && idSelected && (
                <div className="flex flex-row gap-2">
                  <Button
                    type="button"
                    className="mt-1 bg-red-600"
                    onClick={() => hapusItem()}
                    loading={utility.getLoading.button}
                  >
                    Hapus
                  </Button>
                  <Button
                    type="button"
                    className="mt-1"
                    onClick={() => editItem()}
                    loading={utility.getLoading.button}
                  >
                    Edit
                  </Button>
                </div>
              )}
            </div>
          </>
        )}
      </FormPanel>
    </div>
  );
};

export default CreateTodoList;
