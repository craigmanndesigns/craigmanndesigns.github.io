import React, { useState, useEffect } from "react";
import { useTheme } from "@mui/material";
import clsx from "clsx";

const Separator = ({ blok }) => {
  const [backgroundTheme, setBackgroundTheme] = useState();

  useEffect(() => {
    setBackgroundTheme(
      blok.theme === "light"
        ? theme.mode.light.background
        : theme.mode.dark.background
    );
  }, [blok.theme]);

  let theme = useTheme();
  return (
    <div
      className={clsx(
        "h-px w-screen ml-separator",
        "max-md:ml-0",
        "max-sm:ml-separatorMob"
      )}
      style={backgroundTheme}
    ></div>
  );
};

export default Separator;
