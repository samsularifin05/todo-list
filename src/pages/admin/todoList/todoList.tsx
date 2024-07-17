import { PanelAdmin, useDispatch } from "@/shared";
import CreateTodoList from "./ui/createTodoList";
import { useEffect, useState } from "react";
import { AppDispatch, useAppSelector } from "@/app";
import { getDataTodolist } from "./service";
import TodoItem from "./item";

const TodoList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const todoList = useAppSelector((state) => state.todoList.getTodoLost);

  const [idSelected, setidSelected] = useState<number>();
  const [idSelectedPerent, setidSelectedPerent] = useState<number>();
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
          idSelectedPerent={idSelectedPerent}
          idSelected={idSelected}
        />
      </div>
      {todoList.data.map((checklist) => (
        <div key={checklist.id}>
          <li className="flex items-center justify-between p-2 border-b">
            <h2 className="mb-2 font-bold">{checklist?.name}</h2>
            <input
              type="checkbox"
              id={`itemCeklis${checklist.id}`}
              onChange={() => setidSelected(checklist.id)}
            />
          </li>
          {checklist?.items !== null && (
            <ul>
              {checklist?.items.map((item) => (
                <TodoItem
                  key={item.id}
                  id={item.id}
                  name={item?.name || ""}
                  toogle={(id) => setidSelectedPerent(id)}
                  idSelectedPerent={idSelectedPerent}
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
