import { Dropdown, DropdownChangeParams } from "primereact/dropdown";
import { useState } from "react";
import dropdownData, { DropDownModel } from "../../utilities/dropdownData";
interface DropdownProps {
  getCategory: (categoryValue: DropDownModel) => void;
}
const DropdownList = ({ getCategory }: DropdownProps) => {
  const [category, setCategory] = useState("");
  const dropDownOnChange = (event: DropdownChangeParams) => {
    getCategory(event.target.value);
    setCategory(event.target.value);
  };
  return (
    <>
      <Dropdown
        value={category}
        optionLabel="label"
        onChange={dropDownOnChange}
        options={dropdownData}
        placeholder="Select by category"
        filter
      />
    </>
  );
};

export default DropdownList;
