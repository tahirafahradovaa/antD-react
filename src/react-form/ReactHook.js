import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
function ReactHook() {
  const schema = yup.object().shape({
    productName: yup.string().required("please fill the inputs"),
    unitPrice: yup.number().required("please fill the inputs"),
    unitsInStock: yup.number().required("please fill the inputs"),
  });
  const {
    register,
    handleSubmit,
    watch,

    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = (data) => {
    axios({
      method: "POST",
      url: "https://northwind.vercel.app/api/products",
      data: data,
    }).then((res) => {
      console.log(res);
    });
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Product Name</label>
          <input defaultValue="" {...register("productName")} />
          <p style={{ color: "tomato" }}>{errors.productName?.message}</p>
        </div>
        <div>
          <label>Unit Price</label>
          <input defaultValue="" {...register("unitPrice")} />
          <p style={{ color: "tomato" }}>{errors.unitPrice?.message}</p>
        </div>
        <div>
          <label>Units In Stock</label>
          <input defaultValue="" {...register("unitsInStock")} />
          <p style={{ color: "tomato" }}>{errors.unitsInStock?.message}</p>
        </div>

        <input type="submit" />
      </form>
    </>
  );
}

export default ReactHook;
