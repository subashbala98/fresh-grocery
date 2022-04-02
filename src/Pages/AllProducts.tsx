import DropdownList from "../Components/Dropdown/Dropdown";
import { DropDownModel, ProductsModel } from "../utilities/dropdownData";
import { InputText } from "primereact/inputtext";
import { useQuery } from "react-query";
import Card from "../Components/Card/Card";
import fbBaseURL from "../utilities/axios";
import { useState } from "react";
const getAllProducts = () => fbBaseURL.get("/allProducts.json");
const AllProducts = () => {
  const [FilterValue, setFilterValue] = useState({
    searchValue: "",
    categoryValue: "",
  });
  const { data, isLoading } = useQuery(["allProducts"], getAllProducts);
  let getAllProductsData: ProductsModel[] = [];
  if (data?.data) {
    for (const key in data.data) {
      getAllProductsData.push({ ...data.data[key], productDbId: key });
    }
  }
  //** Dropdown search */
  if (FilterValue.categoryValue.length > 1) {
    getAllProductsData =
      getAllProductsData.length > 1
        ? getAllProductsData.filter((f) =>
            f.productCategory.label
              .toLocaleLowerCase()
              .includes(FilterValue.categoryValue.toLowerCase())
          )
        : getAllProductsData;
  }
  //** Input search value */
  if (FilterValue.searchValue.length >= 1) {
    getAllProductsData =
      getAllProductsData.length > 1
        ? getAllProductsData.filter((f) =>
            f.productName
              .toLocaleLowerCase()
              .includes(FilterValue.searchValue.toLowerCase())
          )
        : getAllProductsData;
  }
  return (
    <div className="mt-5">
      <div className="flex justify-content-around align-items-center">
        <InputText
          className="search_text"
          onChange={(e) =>
            setFilterValue({ ...FilterValue, searchValue: e.target.value })
          }
          value={FilterValue.searchValue}
        />
        <DropdownList
          getCategory={(response: DropDownModel) =>
            setFilterValue({ ...FilterValue, categoryValue: response.label })
          }
        />
      </div>
      <div className="flex flex-wrap">
        {getAllProductsData.length >= 1 &&
          getAllProductsData.map((data: ProductsModel, i) => (
            <Card
              name={
                data.productName.charAt(0).toUpperCase() +
                data.productName.slice(1).toLowerCase()
              }
              price={data.productCost}
              key={i}
              imgAlt={data.productName}
              imgUrl={data.productImage}
            />
          ))}
      </div>
    </div>
  );
};
export default AllProducts;
