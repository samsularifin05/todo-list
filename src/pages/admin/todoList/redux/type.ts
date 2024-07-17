import { ResponseTodoListDto } from "../model/response.dto";

export interface GetTodoLostDto {
  data: ResponseTodoListDto[];
}

export interface TodoList {
  getTodoLost: GetTodoLostDto;
}
export const initialState: TodoList = {
  getTodoLost: {
    data: []
  }
};
