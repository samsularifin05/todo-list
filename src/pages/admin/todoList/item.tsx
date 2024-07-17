interface Props {
  name: string | null;
  id: number;
  idSelectedPerent?: number | null;
  itemCompletionStatus: boolean;
  toogle: (id: number, isChecked: boolean) => void;
}
const TodoItem = (props: Props) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    props.toogle(props.id, isChecked);
  };
  return (
    <li className="flex items-center justify-between p-2 ml-4 border-b">
      <span>{props?.name || ""}</span>
      <input
        type="checkbox"
        id={`ceklis${props.id}`}
        // onClick={(e) => e.target.checked}
        onChange={handleChange}
      />
    </li>
  );
};

export default TodoItem;
