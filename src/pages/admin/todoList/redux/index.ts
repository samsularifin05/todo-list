import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GetTodoLostDto, initialState } from "./type";

const todoListReducer = createSlice({
  name: "todoListReducer",
  initialState,
  reducers: {
    setTodoList(state, action: PayloadAction<GetTodoLostDto>) {
      state.getTodoLost = action.payload;
    }
  }
});

const { setTodoList } = todoListReducer.actions;

export { setTodoList };

export default todoListReducer.reducer;
