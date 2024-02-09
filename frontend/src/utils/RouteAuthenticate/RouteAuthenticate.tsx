import { useSelector } from "react-redux";
import { loginSelector } from "../../redux/login/loginSelector";
import React from "react";
import { Navigate, useLocation } from "react-router-dom";

export const RouteAuthenticate = (props: React.PropsWithChildren) => {
  const loggedStatus = useSelector(loginSelector);
  const location = useLocation();
  if (!loggedStatus.loggedIn) {
    return (
      <Navigate
        to="/login"
        state={{ path: location.pathname }}
        replace={true}
      />
    );
  }
  return props.children as React.ReactElement;
};
