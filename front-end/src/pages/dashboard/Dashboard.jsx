import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { CircularProgress, Container, Button, Snackbar } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Custom translation function for Arabic
const translateDate = date => {
  const months = [
    "يناير",
    "فبراير",
    "مارس",
    "أبريل",
    "مايو",
    "يونيو",
    "يوليو",
    "أغسطس",
    "سبتمبر",
    "أكتوبر",
    "نوفمبر",
    "ديسمبر",
  ];
  const d = new Date(date);
  return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
};

const Dashboard = () => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const navigate = useNavigate();
  const openSnackbar = (message, severity) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  const closeSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  const handleDelete = rowId => {
    const token = localStorage.getItem("id-token");
    axios
      .delete(`${process.env.HTTPS_ENDPOINT}/worker/${rowId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(_ => {
        openSnackbar(`تم حذف السجل بنجاح.`, "success");
        setRows(prevRows => prevRows.filter(row => row._id !== rowId));
      })
      .catch(error => {
        openSnackbar(`خطأ أثناء حذف السجل.`, "error");
        console.error(`خطأ أثناء حذف السجل:`, error);
      });
  };

  const handleUpdate = rowId => {
    navigate(`edit-worker/${rowId}`, {
      id: rowId,
    });
  };
  const columns = [
    { field: "idNumber", headerName: "الرقم التعريفي", width: 150 },
    { field: "uidNumber", headerName: "المعرف الوحيد", width: 150 },
    { field: "fullName", headerName: "الاسم الكامل", width: 200 },
    { field: "class", headerName: "الصف", width: 130 },
    { field: "domain", headerName: "المجال", width: 150 },
    { field: "order", headerName: "الترتيب", width: 120 },
    {
      field: "startWorkingDate",
      headerName: "تاريخ المباشرة",
      width: 180,
      valueFormatter: params => translateDate(params.value), // Use custom translation function
    },
    { field: "administrativeStatus", headerName: "الوضع الإداري", width: 150 },
    { field: "phoneNumber", headerName: "رقم الهاتف", width: 150 },
    {
      field: "actions",
      headerName: "الإجراءات",
      width: 200,
      sortable: false,
      renderCell: params => (
        <div>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => handleDelete(params.row._id)}
          >
            حذف
          </Button>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => handleUpdate(params.row._id)}
          >
            تحديث
          </Button>
        </div>
      ),
    },
  ];

  React.useEffect(() => {
    const token = localStorage.getItem("id-token");

    axios
      .get(`${process.env.HTTPS_ENDPOINT}/workers`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(response => {
        setRows(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Container>
      <div style={{ width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={10}
          localeText={{
            columnMenuLabel: "القائمة",
            columnMenuShowColumns: "إظهار الأعمدة",
            columnMenuManageColumns: "إدارة الأعمدة",
            columnMenuFilter: "تصفية",
            columnMenuHideColumn: "إخفاء العمود",
            columnMenuUnsort: "إزالة الترتيب",
            columnMenuSortAsc: "ترتيب تصاعدي",
            columnMenuSortDesc: "ترتيب تنازلي",
            MuiTablePagination: {
              labelRowsPerPage: "عدد الصفوف في الصفحة:",
              labelDisplayedRows: ({ from, to, count }) =>
                `${from} - ${to} من إجمالي ${count}`,
            },
          }}
          getRowId={row => row._id}
        />
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={closeSnackbar}
          message={snackbarMessage}
          severity={snackbarSeverity}
        />
      </div>
    </Container>
  );
};

export default Dashboard;
