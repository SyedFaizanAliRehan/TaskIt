import React from "react";
import { Appbar } from "../../components/Appbar/Appbar";
import { Drawer } from "../../components/Drawer/Drawer";
import { DashboardWorkspace } from "../../components/DashboardWorkspace/DashboardWorkspace";

export default function Dashboard() {
  return (
    <>
      <Appbar />
      <Drawer />
      <DashboardWorkspace isLoading={false} />
    </>
  );
}
