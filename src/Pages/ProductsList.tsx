import { useQuery } from "react-query";
import fbBaseURL from "../utilities/axios";
import { ProductsModel } from "../utilities/dropdownData";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import React from "react";
import { useNavigate } from "react-router-dom";
const getAllProducts = () => fbBaseURL.get("/allProducts.json");
const ProductsList = () => {
  const navigate = useNavigate();
  const { data, isLoading } = useQuery(["allProducts"], getAllProducts);
  let getAllProductsData: ProductsModel[] = [];
  if (data?.data) {
    for (const key in data.data) {
      // data.data[key]?.productName.charAt(0).toUpperCase() +
      //   data.data[key]?.productName.slice(1).toLowerCase()
      getAllProductsData.push({ ...data.data[key], productDbId: key });
    }
  }
  const nameBodyTemplate = (rowData: ProductsModel) => (
    <React.Fragment>
      <img
        className="table_image"
        alt={rowData.productName}
        src={rowData.productImage}
        width={30}
      />
      <span className="image-text">{rowData.productName}</span>
    </React.Fragment>
  );
  const editProduct = (rowData: ProductsModel) => (
    <div
      className="editIcon"
      onClick={() =>
        navigate(`${rowData.productDbId}`, {
          state: getAllProductsData,
        })
      }
    >
      {" "}
      <i
        className="pi pi-pencil
mr-2"
      ></i>
    </div>
  );
  return (
    <div className="mt-4">
      <DataTable value={getAllProductsData}>
        <Column
          sortable
          field="productName"
          body={nameBodyTemplate}
          header="Name"
        ></Column>
        <Column sortable field="productCost" header="Price"></Column>
        <Column
          sortable
          field="productCategory.label"
          header="Category"
        ></Column>
        <Column header="Edit" body={editProduct}></Column>
      </DataTable>
    </div>
  );
};
export default ProductsList;
