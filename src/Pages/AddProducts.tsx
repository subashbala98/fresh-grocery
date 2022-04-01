import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { FormikValues, useFormik } from "formik";
import dropdownData from "../utilities/dropdownData";
import { useRef, useState } from "react";
import { Toast } from "primereact/toast";
import fbBaseURL from "../utilities/axios";
import { useNavigate } from "react-router-dom";
const AddProducts = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState("");
  const toast = useRef<any>();
  const validate = (values: FormikValues) => {
    let error: FormikValues = {};
    if (values.productName.length < 2) {
      error.productName = "Product Name is Required!";
    }
    if (values.productCost < 1 || values.productCost === 0) {
      error.productCost = "Enter valid Product Price";
    }
    if (values.productCategory.label.length < 1) {
      error.productCategory = "Select Product Category";
    }
    if (values.productImage.length < 10) {
      error.productImage = "Add Product image URL";
    }
    return error;
  };
  const formik = useFormik({
    initialValues: {
      productName: "",
      productCost: 0,
      productCategory: { id: 1, label: "" },
      productImage: "",
    },
    onSubmit: (values) => {
      toast.current.show({
        severity: "success",
        summary: "Success Message",
        detail: "New Product Added Successfully",
        life: 3000,
      });
      async function addProducts(params: any) {
        const response = await fbBaseURL.post("/allProducts.json", params, {
          responseType: "json",
        });
        return response;
      }
      addProducts(values);
      setCategory("");
      formik.resetForm();
      setTimeout(() => {
        navigate("/");
      }, 2000);
    },
    validate: validate,
  });

  return (
    <>
      <Toast ref={toast} />
      <div className="flex align-align-items-center justify-content-evenly">
        <form onSubmit={formik.handleSubmit} className="add_product">
          <div className="mt-6 mb-6">
            <span className="p-float-label">
              <InputText
                onChange={formik.handleChange}
                name="productName"
                autoComplete="off"
                value={formik.values.productName}
                id="name"
              />
              <label htmlFor="name">Product Name</label>
            </span>
            {formik.touched.productName && formik.errors.productName && (
              <small className="p-error">{formik.errors.productName}</small>
            )}
          </div>
          <div>
            <span className="p-float-label">
              <InputText
                type="number"
                onChange={formik.handleChange}
                name="productCost"
                id="in"
                value={
                  formik.values.productCost === 0
                    ? ""
                    : formik.values.productCost
                }
                autoComplete="off"
              />
              <label htmlFor="in">Product Cost</label>
            </span>
            {formik.touched.productCost && formik.errors.productCost && (
              <small className="p-error">{formik.errors.productCost}</small>
            )}
          </div>
          <div className="mt-6 mb-6">
            <Dropdown
              name="productCategory"
              value={category}
              optionLabel="label"
              onChange={(e) => {
                setCategory(e.target.value);
                formik.values.productCategory = e.target.value;
              }}
              options={dropdownData}
              placeholder="Select by category"
              filter
            />
            {formik.touched.productCategory &&
              formik.errors.productCategory &&
              !category && (
                <small className="p-error dropDown_error">
                  {formik.errors.productCategory}
                </small>
              )}
          </div>
          <div>
            <span className="p-float-label">
              <InputText
                onChange={formik.handleChange}
                name="productImage"
                autoComplete="off"
                id="image"
                value={formik.values.productImage}
              />
              <label htmlFor="img">Product image URL</label>
            </span>
            {formik.touched.productImage && formik.errors.productImage && (
              <small className="p-error">{formik.errors.productImage}</small>
            )}
          </div>
          <div className="mt-6 mb-6 flex justify-content-between">
            <Button
              type="submit"
              label="Add Product"
              className="p-button-success p-button-rounded"
            />
            <Button
              label="Cancel"
              type="reset"
              onClick={(e) => {
                setCategory("");
                formik.resetForm();
                toast.current.show({
                  severity: "info",
                  summary: "Cancel Message",
                  detail: "New Product Cancelled Successfully",
                  life: 3000,
                });
              }}
              className="p-button-warning p-button-rounded"
            />
          </div>
        </form>
        <div></div>
      </div>
    </>
  );
};
export default AddProducts;
