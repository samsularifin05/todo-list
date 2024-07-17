interface Props {
  name: string | null;
  id: number;
  idSelectedPerent?: number;
  itemCompletionStatus: boolean;
  toogle: (id: number) => void;
}
const TodoItem = (props: Props) => {
  return (
    <li className="flex items-center justify-between p-2 ml-4 border-b">
      <span>{props?.name || ""}</span>
      <input
        type="checkbox"
        id={`ceklis${props.id}`}
        onChange={() => props.toogle(props.id)}
      />
    </li>
  );
};

export default TodoItem;
