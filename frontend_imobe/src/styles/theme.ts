import { createTheme } from "@material-ui/core";

const theme = createTheme({
  palette: {
    background: {
      default: "#f0f0f0",
    },
    primary: {
      main: "#f0f0f0",
    },


    secondary: {
      main: "#39e488",
    },
    error: {
      main: "#ed394f",
    },
    action: {
      hover: '#0b8e5f',
      hoverOpacity: 0.9,
    },
  },

});

export default theme;
