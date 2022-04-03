import { Dropdown, DropdownChangeParams } from "primereact/dropdown";
import { useState } from "react";
import dropdownData, { DropDownModel } from "../../utilities/dropdownData";
interface DropdownProps {
  getCategory: (categoryValue: DropDownModel) => void;
}
const DropdownList = ({ getCategory }: DropdownProps) => {
  const [category, setCategory] = useState({ id: 0, label: "" });
  const dropDownOnChange = (event: DropdownChangeParams) => {
    getCategory(event.target.value);
    setCategory(event.target.value);
  };
  return (
    <>
      <div>
        <Dropdown
          value={category}
          optionLabel="label"
          onChange={dropDownOnChange}
          options={dropdownData}
          placeholder="Select by category"
          filter
        />
        {category.label.length >= 1 && (
          <span className="ml-3">
            <i
              onClick={() => {
                getCategory({ id: 0, label: "" });
                setCategory({ id: 0, label: "" });
              }}
              className="pi pi-refresh resetDropdown"
            ></i>
          </span>
        )}
      </div>
    </>
  );
};

export default DropdownList;
