import React, { useEffect, useState } from "react";
import { storyblokEditable, StoryblokComponent } from "gatsby-source-storyblok";
import { Link } from "gatsby-link";

import clsx from "clsx";

import { useTheme } from "@mui/material";

const Footer = ({ blok, sectionTheme, sectionBG }) => {
  const currentYear = new Date().getFullYear();

  return (
    <div
      className={clsx([
        "flex justify-between items-center px-4 py-20",
        "text-white",
        "max-sm:flex-col max-sm:gap-y-8",
      ])}
    >
      <div className={clsx("w-full flex justify-center")}>
        <Link className={clsx("px-5 py-6 hover:bg-white10")} to={"/contact"}>
          <span className={clsx("flex items-center justify-middle")}>
            <span className={clsx("text-2xl mr-2")}>👀</span> CHECK OUT MY WORK
          </span>
        </Link>
      </div>
      <div className={clsx("w-full flex justify-center")}>
        <Link className={clsx("px-5 py-6 hover:bg-white10")} to={"/contact"}>
          <span className={clsx("flex items-center justify-middle")}>
            GET IN TOUCH <span className={clsx("text-2xl ml-2")}>😶</span>
          </span>
        </Link>
      </div>
      <div className={clsx("w-full flex justify-center text-light-slate")}>
        Craig Mann Designs {currentYear} ∆
      </div>
    </div>
  );
};

export default Footer;
