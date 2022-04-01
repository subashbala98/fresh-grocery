import { useQuery } from "react-query";
import fbBaseURL from "../utilities/axios";
import { ProductsModel } from "../utilities/dropdownData";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
const getAllProducts = () => fbBaseURL.get("/allProducts.json");
const ProductsList = () => {
  const { data, isLoading } = useQuery(["allProducts"], getAllProducts);
  let getAllProductsData: ProductsModel[] = [];
  if (data?.data) {
    for (const key in data.data) {
      // data.data[key]?.productName.charAt(0).toUpperCase() +
      //   data.data[key]?.productName.slice(1).toLowerCase()
      getAllProductsData.push(data.data[key]);
    }
  }
  return (
    <div className="mt-4">
      <DataTable value={getAllProductsData}>
        <Column field="" header=""></Column>
        <Column field="productName" header="Name"></Column>
        <Column field="productCost" header="Price"></Column>
        <Column field="productCategory.label" header="Category"></Column>
      </DataTable>
    </div>
  );
};
export default ProductsList;
