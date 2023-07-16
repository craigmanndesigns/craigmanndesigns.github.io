import React, { useEffect, useState } from "react";
import { Link } from "gatsby-link";
import { storyblokEditable } from "gatsby-source-storyblok";
import clsx from "clsx";

import { GitHub, LinkOutlined } from "@mui/icons-material";
import { LinkedIn } from "@mui/icons-material";
import { Instagram } from "@mui/icons-material";

const NavItem = ({ blok, sectionBG }) => {
  const [icon, setIcon] = useState();
  const [url, setURL] = useState("/" + blok.link.cached_url);

  useEffect(() => {
    if (blok.icon === "github") setIcon(<GitHub />);
    if (blok.icon === "linkedin") setIcon(<LinkedIn />);
    if (blok.icon === "instagram") setIcon(<Instagram />);
  }, []);

  return (
    <div {...storyblokEditable(blok)} className={clsx("flex")}>
      {blok.name ? renderButton() : renderIconButton()}
    </div>
  );

  function renderIconButton() {
    return (
      <a
        role="button"
        className={clsx(
          "p-2 rounded-full",
          sectionBG
            ? "bg-black10 hover:bg-black hover:text-white"
            : "bg-white10 text-white hover:bg-white hover:text-black"
        )}
        href={blok.link.url}
      >
        <span className={clsx("h-6 w-6 flex items-center justify-middle")}>
          {icon}
        </span>
      </a>
    );
  }
  function renderButton() {
    return (
      <Link
        className={clsx(
          "px-5 py-4",
          sectionBG
            ? "bg-black10 hover:bg-black hover:text-white"
            : "bg-white10 text-white hover:bg-white hover:text-black"
        )}
        to={url}
      >
        <span className={clsx("flex items-center justify-middle")}>
          {blok.name}
        </span>
      </Link>
    );
  }
};

export default NavItem;
