import React from "react";
import { Categories } from "../components/categories/Categories";
import { Metrics } from "../components/metrics/Metrics";
import { LatestProduct } from "../components/products/LatestProduct";
import { Products } from "../components/products/Products"
import { Users } from "../components/users/Users";

export const Home = () => {
  return (
    <div className="container-fluid">
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0 text-title">DALF - STORE</h1>
      </div>

      <Metrics />

      <div className="row">
        <Products />
        <Users />
        <Categories />
        <LatestProduct />
      </div>
    </div>
  );
};
