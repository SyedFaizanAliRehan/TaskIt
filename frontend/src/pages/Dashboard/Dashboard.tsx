import React from "react";
import { Link, Outlet } from "react-router-dom";

export default function Dashboard() {
  return (
    <>
      <div>Dashboard</div>
      <Link to="products">Products</Link>
      <Outlet />
    </>
  );
}
