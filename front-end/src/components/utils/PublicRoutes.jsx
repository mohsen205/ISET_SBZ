import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { CircularProgress } from "@mui/material";

const PublicRoutes = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const idToken = localStorage.getItem("id-token");
    if (idToken) {
      navigate("/dashboard");
    }
    setIsLoading(false);
  }, []);

  return isLoading ? <CircularProgress /> : children;
};

export default PublicRoutes;

PublicRoutes.propTypes = {
  children: PropTypes.node,
};
