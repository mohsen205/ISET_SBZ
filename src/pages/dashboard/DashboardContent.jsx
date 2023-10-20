import React from "react";
import { Route, Routes } from "react-router-dom";
import { Box } from "@mui/material";

import { AddWorker, Dashboard, EditWorker } from "./";
import { Navbar } from "../../components/internal-component";

const DashboardContent = () => {
  return (
    <>
      <Navbar />
      <Box
        sx={{
          py: 1,
        }}
      >
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="add-worker" element={<AddWorker />} />
          <Route path="edit-worker/:id" element={<EditWorker />} />
        </Routes>
      </Box>
    </>
  );
};

export default DashboardContent;
