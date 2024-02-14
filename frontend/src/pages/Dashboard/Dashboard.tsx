import React, { useState } from "react";
import { Appbar } from "../../components/Appbar/Appbar";
import { Drawer } from "../../components/Drawer/Drawer";
import { DashboardWorkspace } from "../../components/DashboardWorkspace/DashboardWorkspace";
import { Outlet } from "react-router-dom";

export default function Dashboard() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const handleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };
  return (
    <>
      <Appbar handleDrawer={handleDrawer} />
      <Drawer drawerOpen={drawerOpen} />
      <DashboardWorkspace isLoading={false} drawerOpen={drawerOpen}>
        <Outlet />
      </DashboardWorkspace>
    </>
  );
}
