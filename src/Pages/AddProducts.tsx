import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { FormikValues, useFormik } from "formik";
import dropdownData, { ProductsModel } from "../utilities/dropdownData";
import { useEffect, useRef, useState } from "react";
import { Toast } from "primereact/toast";
import fbBaseURL from "../utilities/axios";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import InputField from "../Components/InputField/InputField";
const AddProducts = () => {
  const [editProduct, setEditProduct] = useState(false);
  const navigate = useNavigate();
  const { productDbId } = useParams();
  const { state }: any = useLocation();
  const getEditProductDetails =
    state?.length >= 1 &&
    state.find((f: ProductsModel) => f.productDbId === productDbId);
  // provide default value and edit product value
  const setFormikValues = (
    name: string,
    cost: number,
    category: {},
    imageUrl: string
  ) => {
    formik.setFieldValue("productName", name);
    formik.setFieldValue("productCost", cost);
    formik.setFieldValue("productCategory", category);
    formik.setFieldValue("productImage", imageUrl);
  };
  useEffect(() => {
    setEditProduct(getEditProductDetails && productDbId ? true : false);
  }, [getEditProductDetails, productDbId]);
  useEffect(() => {
    if (editProduct) {
      setFormikValues(
        getEditProductDetails.productName,
        getEditProductDetails.productCost,
        getEditProductDetails.productCategory,
        getEditProductDetails.productImage
      );
    }
    if (!editProduct) {
      setFormikValues("", 0, { id: 0, label: "" }, "");
    }
  }, [editProduct]);
  const toast = useRef<any>();
  const toastMessage = (severity: string, summary: string, detail: string) =>
    toast.current.show({
      severity: severity,
      summary: summary,
      detail: detail,
      life: 3000,
    });
  // Handle validation
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
  const addProducts = async (params: any) =>
    await fbBaseURL.post("/allProducts.json", params, {
      responseType: "json",
    });
  const addEditProducts = async (productId: string, params: any) =>
    await fbBaseURL.put(`/allProducts/${productId}/.json`, params, {
      responseType: "json",
    });

  const formikValues = {
    productName: "",
    productCost: 0,
    productCategory: { id: 1, label: "" },
    productImage: "",
  };
  const formik = useFormik({
    initialValues: formikValues,
    onSubmit: (values) => {
      if (getEditProductDetails && productDbId) {
        addEditProducts(productDbId, values);
        toastMessage(
          "success",
          "Success Message",
          "Edited Product Saved Successfully"
        );
        setTimeout(() => {
          navigate("/list");
        }, 2000);
      }
      if (!getEditProductDetails && !productDbId) {
        toastMessage(
          "success",
          "Success Message",
          "New Product Added Successfully"
        );
        addProducts(values);
        formik.resetForm();
        setTimeout(() => {
          navigate("/");
        }, 2000);
      }
    },
    validate: validate,
  });
  const displayValidation = {
    display: editProduct ? "none" : "block",
  };
  return (
    <>
      <Toast ref={toast} />

      <div className="flex align-align-items-center justify-content-evenly">
        <form onSubmit={formik.handleSubmit} className="add_product">
          <h3 className="mt-5 mb-5">
            {editProduct
              ? `Edit Product ${getEditProductDetails.productName}!`
              : "Add New Product!"}
          </h3>
          <div className="mt-6 mb-6">
            <InputField
              label="Product Name"
              type="text"
              value={formik.values.productName}
              name="productName"
              id="name"
              changeEvent={formik.handleChange}
            />
            {formik.touched.productName && formik.errors.productName && (
              <small className="p-error">{formik.errors.productName}</small>
            )}
          </div>
          <div>
            <InputField
              label="Product Cost"
              type="number"
              value={
                formik.values.productCost === 0 ? "" : formik.values.productCost
              }
              name="productCost"
              id="in"
              changeEvent={formik.handleChange}
            />
            {formik.touched.productCost && formik.errors.productCost && (
              <small className="p-error">{formik.errors.productCost}</small>
            )}
          </div>
          <div className="mt-6 mb-6">
            <Dropdown
              name="productCategory"
              value={formik.values.productCategory}
              optionLabel="label"
              onChange={formik.handleChange}
              options={dropdownData}
              placeholder="Select by category"
              filter
            />
            {formik.touched.productCategory &&
              formik.errors.productCategory && (
                <small className="p-error dropDown_error">
                  {formik.errors.productCategory}
                </small>
              )}
          </div>
          <div>
            <InputField
              label="Product image URL"
              type="text"
              value={formik.values.productImage}
              name="productImage"
              id="img"
              changeEvent={formik.handleChange}
            />
            {formik.touched.productImage && formik.errors.productImage && (
              <small className="p-error">{formik.errors.productImage}</small>
            )}
          </div>
          <div className="mt-6 mb-6 flex justify-content-between">
            <Button
              style={displayValidation}
              type="submit"
              label="Add Product"
              className="p-button-success p-button-rounded"
            />
            <Button
              style={displayValidation}
              label="Cancel"
              type="reset"
              onClick={(e) => {
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
          <div
            style={{
              display: editProduct ? "block" : "none",
            }}
          >
            <Button
              type="submit"
              label="Add Edit Product"
              className="p-button-success p-button-rounded editBtn"
            />
          </div>
        </form>
        <div></div>
      </div>
    </>
  );
};
export default AddProducts;
