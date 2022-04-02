import { InputText } from "primereact/inputtext";
interface InputProps {
  type: string;
  name: string;
  changeEvent: (e: React.FormEvent<HTMLInputElement>) => void;
  value: any;
  id: string;
  label: string;
}
const InputField = (props: InputProps) => (
  <>
    <span className="p-float-label">
      <InputText
        type={props.type}
        onChange={props.changeEvent}
        name={props.name}
        id={props.id}
        value={props.value}
        autoComplete="off"
      />
      <label htmlFor={props.id}>{props.label}</label>
    </span>
  </>
);

export default InputField;
