"use client";

import React, { Component } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./login/page";
import Unauthorized from "./unauthorized/page";
import Machines from "./machines/page";
import CreateMachinePage from "./machines/createMachine/page";
import PrivateRoute from "@/PrivateRoute";
import Maintenance from "./maintenance/page";
import CreateMaintenancePage from "./maintenance/createMaintenance/page";
import Teams from "./teams/page";
import CreateTeamPage from "./teams/createTeam/page";
import Tools from "./tools/page";
import CreateToolPage from "./tools/createTool/page";
import ControlStock from "./controlStock/page";
import CreateUser from "./createUsers/page"

const publicRoutes = [
  { path: "/login", component: Login },
  { path: "/unauthorized", component: Unauthorized },
];

const privateRoutes = [
  { path: "/machines", component: Machines },
  { path: "/machines/createMachine", component: CreateMachinePage },
  { path: "/maintenance", component: Maintenance },
  { path: "/maintenance/createMaintenance", component: CreateMaintenancePage },
  { path: "/teams", component: Teams },
  { path: "/teams/createTeam", component: CreateTeamPage },
  { path: "/tools", component: Tools },
  { path: "/teams/createTool", component: CreateToolPage },
  { path: "/controlStock", component: ControlStock },
  { path: "/createUsers", component: CreateUser},
];

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        {/* Rotas Públicas */}
        {publicRoutes.map(({ path, component: Component }) => (
          <Route key={path} path={path} element={<Component />} />
        ))}

        {/* Rotas Privadas */}
        {privateRoutes.map(({ path, component: Component }) => (
          <Route key={path} path={path} element={<PrivateRoute component={Component} />} />
        ))}

        {/* Redirecionamento para login se a rota não existir */}
        <Route path="*" element={<Login />} />
      </Routes>
    </Router>
  );
}
