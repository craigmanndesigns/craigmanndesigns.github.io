import React, { useState, useEffect } from "react";
import { useTheme } from "@mui/material";
import clsx from "clsx";

const Separator = ({ blok }) => {
  const [backgroundTheme, setBackgroundTheme] = useState();
  let theme = useTheme();

  useEffect(() => {
    setBackgroundTheme(
      blok.theme === "light"
        ? theme.mode.light.background
        : theme.mode.dark.background
    );
  }, [blok.theme, theme.mode.light.background, theme.mode.dark.background]);

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
