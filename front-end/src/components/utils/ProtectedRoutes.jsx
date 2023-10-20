import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { CircularProgress } from "@mui/material";

const ProtectedRoutes = ({ children }) => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const idToken = localStorage.getItem("id-token");

    if (!idToken) {
      navigate("/");
    }

    setIsLoading(false);
  });

  return isLoading ? <CircularProgress /> : children;
};

export default ProtectedRoutes;

ProtectedRoutes.propTypes = {
  children: PropTypes.node,
};
