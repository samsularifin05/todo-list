import { PanelAdmin, useDispatch } from "@/shared";
import CreateTodoList from "./ui/createTodoList";
import { useEffect } from "react";
import { AppDispatch, useAppSelector, utilityActions } from "@/app";
import { getDataTodolist } from "./service";
import TodoItem from "./item";

interface ItemIdType {
  idSelected?: number;
  idSelectedPerent?: number;
}
const TodoList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const todoList = useAppSelector((state) => state.todoList.getTodoLost);
  const dataTmp = useAppSelector(
    (state) => state.utility.getDataTmp
  ) as ItemIdType;

  const loadingScreen = useAppSelector(
    (state) => state.utility.getLoading.screen
  );

  useEffect(() => {
    dispatch(getDataTodolist());
  }, [dispatch]);

  return (
    <PanelAdmin>
      <div className="flex items-center mb-10">
        <CreateTodoList
          idSelectedPerent={dataTmp?.idSelectedPerent}
          idSelected={dataTmp?.idSelected}
        />
      </div>
      {todoList.data.map((checklist) => (
        <div key={checklist.id}>
          <li className="flex items-center justify-between p-2 border-b">
            <h2 className="mb-2 font-bold">{checklist?.name}</h2>
            <input
              type="checkbox"
              id={`itemCeklis${checklist.id}`}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                if (e.target.checked) {
                  dispatch(
                    utilityActions.simpanDataTmp({
                      ...dataTmp,
                      idSelected: checklist.id
                    })
                  );
                } else {
                  dispatch(utilityActions.simpanDataTmp(null));
                }
              }}
            />
          </li>
          {checklist?.items !== null && (
            <ul>
              {checklist?.items.map((item) => (
                <TodoItem
                  key={item.id}
                  id={item.id}
                  name={item?.name || ""}
                  toogle={(id, isChecked) => {
                    if (isChecked) {
                      // setidSelectedPerent(id);
                      dispatch(
                        utilityActions.simpanDataTmp({
                          ...dataTmp,
                          idSelectedPerent: id
                        })
                      );
                    } else {
                      // setidSelectedPerent(null);
                      dispatch(utilityActions.simpanDataTmp(null));
                    }
                  }}
                  idSelectedPerent={dataTmp?.idSelectedPerent}
                  itemCompletionStatus={item.itemCompletionStatus}
                />
              ))}
            </ul>
          )}
        </div>
      ))}

      {loadingScreen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-75">
          <div className="w-32 h-32 ease-linear border-8 border-t-8 border-gray-200 rounded-full loader"></div>
        </div>
      )}
    </PanelAdmin>
  );
};

export default TodoList;
