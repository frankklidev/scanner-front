import { FC, ReactElement } from "react";
import { Route, Routes } from "react-router-dom";
import { Users } from "../pages";
import { Navigate } from "react-router";

export const UsersRouter: FC = (): ReactElement => {
  return (
    <Routes>
      <Route path={""} element={<Users />} />
      <Route path={"create"} element={<Users />} />
      <Route path={":userId/edit"} element={<Users />} />
      <Route path={"*"} element={<Navigate to={"/dashboard"} replace />} />
    </Routes>
  );
};

export default UsersRouter;
