import { createTheme } from "@mui/material/styles";
import { arSA } from "@mui/material/locale";

const theme = createTheme({
  typography: {
    button: {
      textTransform: "capitalize",
    },
  },
  arSA,
  direction: "rtl",
});

export default theme;
