import { formReducer, reducerTheme, reducerUtility } from "./reducer";
import { combineReducers } from "redux";
import todoListReducer from "@/pages/admin/todoList/redux";

const rootReducer = combineReducers({
  utility: reducerUtility,
  theme: reducerTheme,
  form: formReducer,
  todoList: todoListReducer
});

export { rootReducer };
