import React from "react";
import { createTheme, ThemeProvider } from "@mui/material";

let theme = createTheme({
  palette: {
    primary: {
      main: "#1b1b1b",
      alternative: "#b3b3b3",
    },
    secondary: {
      main: "#fff",
    },
    alternative: {
      main: "#3b3b3b",
    },
  },
  mode: {
    light: {
      backgroundColor: "#fff",
      color: "#1b1b1b",
    },
  },
  shape: {
    borderRadius: "0",
  },
  spacing: {
    0: "0rem",
    1: "24rem",
  },
  gridStart: {
    gridStart1: "1",
    gridStart2: "2",
    gridStart3: "3",
    gridStart4: "4",
    gridStart5: "5",
    gridStart6: "6",
    gridStart7: "7",
    gridStart8: "8",
    gridStart9: "9",
    gridStart10: "10",
  },
  gridSpan: {
    gridSpan2: "span 2",
    gridSpan4: "span 4",
    gridSpan6: "span 6",
    gridSpan8: "span 8",
    gridSpan10: "span 10",
    gridSpan12: "span 12",
  },
  gridEnd: {
    gridEnd6: { gridColumnStart: "6" },
    gridEnd8: { gridColumnStart: "8" },
    gridEnd10: { gridColumnStart: "10" },
    gridEnd12: { gridColumnStart: "12" },
  },
});

const brutalTheme = createTheme(theme, {
  components: {
    MuiButton: {
      styleOverrides: {
        sizeMedium: {
          padding: "1rem 2rem",
        },
        text: {
          "&:hover": {
            background: "none",
            outline: "solid 1px",
            outlineColor: theme.palette.primary,
            outlineOffset: "-1px",
          },
        },
      },
    },
    mode: {
      light: {
        background: {
          backgroundColor: "#fff",
          color: theme.palette.primary.main,
        },
      },
      dark: {
        background: {
          backgroundColor: theme.palette.primary.main,
          color: "#fff",
        },
      },
    },
  },
  mode: {
    light: {
      background: {
        backgroundColor: "#fff",
        color: theme.palette.primary.main,
      },
    },
    dark: {
      background: {
        backgroundColor: theme.palette.primary.main,
        color: "#fff",
      },
    },
  },
});

export default function BrutalTheme({ children }) {
  return <ThemeProvider theme={brutalTheme}>{children}</ThemeProvider>;
}
