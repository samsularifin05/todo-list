export interface ResponseTodoListDto {
  id: number;
  name: string;
  items: ItemsTodoList[];
  checklistCompletionStatus: boolean;
}

interface ItemsTodoList {
  id: number;
  name: string | null;
  itemCompletionStatus: boolean;
}
