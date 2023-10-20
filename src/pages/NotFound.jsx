import React from "react";
import { Typography, Link } from "@mui/material";
import BoxCentered from "../components/utils/BoxCentered";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <BoxCentered sx={{ flexDirection: "column", minHeight: "100vh" }}>
      <Typography variant="h2" gutterBottom>
        404 غير موجود
      </Typography>
      <Typography variant="h6" gutterBottom>
        عفوًا! يبدو أنك قد ضللت الطريق.
      </Typography>
      <Typography variant="body1" gutterBottom>
        الصفحة التي تبحث عنها غير موجودة. يمكنك العودة إلى الصفحة
        <Link
          underline="none"
          variant="body1"
          color="primary"
          onClick={() => navigate(-1)}
          sx={{ cursor: "pointer" }}
        >
          السابقة.
        </Link>
        .
      </Typography>
    </BoxCentered>
  );
};

export default NotFound;
