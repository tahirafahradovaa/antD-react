import React from "react";
import { useFormik } from "formik";
import axios from "axios";
import * as yup from "yup";

function Formsample() {
  const validation = yup.object().shape({
    productName: yup.string().required("please fill the inputs"),
    unitPrice: yup.number().required("please fill the inputs"),
    unitsInStock: yup.number().required("please fill the inputs"),
  });
  const formik = useFormik({
    initialValues: {
      productName: "",
      unitPrice: "",
      unitsInStock: "",
    },
    validationSchema: validation,
    onSubmit: (values) => {
      axios({
        method: "POST",
        url: "https://northwind.vercel.app/api/products",
        data: values,
      }).then((res) => {
        console.log(res);
      });
    },
  });
  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <div>
          {formik.errors.productName ? (
            <span style={{ color: "tomato" }}>{formik.errors.productName}</span>
          ) : (
            <></>
          )}
          <label htmlFor="productName">Product Name </label>
          <input
            id="productName"
            name="productName"
            type="productName"
            onChange={formik.handleChange}
            value={formik.values.email}
          />
        </div>
        <div>
          {formik.errors.unitPrice ? (
            <span style={{ color: "tomato" }}>{formik.errors.unitPrice}</span>
          ) : (
            <></>
          )}
          <label htmlFor="unitPrice">Unit Price </label>

          <input
            id="unitPrice"
            name="unitPrice"
            type="unitPrice"
            onChange={formik.handleChange}
            value={formik.values.email}
          />
        </div>
        <div>
          {formik.errors.unitsInStock ? (
            <span style={{ color: "tomato" }}>
              {formik.errors.unitsInStock}
            </span>
          ) : (
            <></>
          )}
          <label htmlFor="unitsInStock">Units in stock </label>

          <input
            id="unitsInStock"
            name="unitsInStock"
            type="unitsInStock"
            onChange={formik.handleChange}
            value={formik.values.email}
          />
        </div>

        <button type="submit">Submit</button>
      </form>
    </>
  );
}

export default Formsample;
