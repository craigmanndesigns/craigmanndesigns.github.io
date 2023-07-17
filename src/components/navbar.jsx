import React, { useEffect, useState } from "react";
import { storyblokEditable, StoryblokComponent } from "gatsby-source-storyblok";
import clsx from "clsx";
import { ClearAll, Home, Menu, Clear } from "@mui/icons-material";
import { Link } from "gatsby-link";

import useWindowWidth from "../hooks/useWindowWidth";

const Navbar = ({ blok }) => {
  const [sectionBG, setSectionBg] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const [isHover, setIsHover] = useState(false);
  const [renderMenu, setRenderMenu] = useState(false);

  const windowWidth = useWindowWidth();

  useEffect(() => {
    const heroSection = document.getElementById("hero");
    if (heroSection) {
      setSectionBg(heroSection.className.includes("bg-white"));
    }
  }, []);

  useEffect(() => {
    if (windowWidth >= 420) {
      setRenderMenu(true);
    }
  }, [windowWidth]);
  useEffect(() => {
    if (openMenu === true) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
  }, [openMenu]);
  const handleShowMenu = () => {
    setOpenMenu(!openMenu);
  };

  function onMouseEnter() {
    setIsHover(true);
  }

  function onMouseLeave() {
    setIsHover(false);
  }

  return <>{renderMenu ? renderNav() : renderMobNav()}</>;

  function renderNav() {
    return (
      <nav className={clsx("w-full flex absolute p-8 top-0 gap-x-4")}>
        <div className={clsx("flex items-center")}>
          <a
            role="button"
            className={clsx(
              "p-2 rounded-full",
              sectionBG
                ? "bg-black10 hover:bg-black hover:text-white"
                : "bg-white10 text-white hover:bg-white hover:text-black"
            )}
            href={"/"}
          >
            <span className={clsx("h-6 w-6 flex items-center justify-middle")}>
              <Home />
            </span>
          </a>
        </div>
        <ul
          {...storyblokEditable(blok)}
          key={blok._uid}
          className={clsx("m-0 p-0 w-full flex justify-end gap-x-4")}
        >
          {blok.body.map((blok) => (
            <li key={blok._uid} className={clsx("flex items-center")}>
              <StoryblokComponent blok={blok} sectionBG={sectionBG} />
            </li>
          ))}
        </ul>
        <ul
          {...storyblokEditable(blok)}
          key={blok._uid}
          className={clsx("m-0 p-0 flex justify-end gap-x-2")}
        >
          {blok.icons.map((blok) => (
            <li key={blok._uid} className={clsx("flex items-center")}>
              <StoryblokComponent blok={blok} sectionBG={sectionBG} />
            </li>
          ))}
        </ul>
      </nav>
    );
  }

  function renderMobNav() {
    return (
      <>
        <div
          className={clsx("flex absolute p-8 top-0 right-0 gap-x-4 z-30")}
          onClick={handleShowMenu}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        >
          {openMenu ? RenderCloseIcon() : renderMenuIcon()}
        </div>
        <nav
          className={clsx(
            "absolute p-4 top-0 gap-x-4 bg-black",
            openMenu ? "flex" : "hidden",
            "w-screen h-screen",
            "flex-col justify-between",
            "z-10"
          )}
        >
          <div
            className={clsx(
              "border border-white h-full p-6 pt-20",
              "flex flex-col justify-between"
            )}
          >
            <ul
              {...storyblokEditable(blok)}
              key={blok._uid}
              className={clsx(
                "m-0 p-0 w-full",
                "flex flex-col items-center justify-end gap-8",
                "my-8"
              )}
            >
              <Link
                className={clsx(
                  "px-5 py-4",
                  "bg-white10 text-white hover:bg-white hover:text-black"
                )}
                to={"/"}
                onClick={handleShowMenu}
              >
                <span className={clsx("flex items-center justify-middle")}>
                  Home
                </span>
              </Link>
              {blok.body.map((blok) => (
                <li
                  key={blok._uid}
                  className={clsx("flex items-center justify-end")}
                >
                  <StoryblokComponent blok={blok} sectionBG={false} />
                </li>
              ))}
            </ul>
            <ul
              {...storyblokEditable(blok)}
              key={blok._uid}
              className={clsx(
                "m-0 p-0 flex items-center justify-center gap-x-2"
              )}
            >
              {blok.icons.map((blok) => (
                <li key={blok._uid} className={clsx("flex items-center")}>
                  <StoryblokComponent blok={blok} sectionBG={false} />
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </>
    );
  }

  function renderMenuIcon() {
    return (
      <div
        className={clsx(
          "p-2 rounded-full",
          sectionBG
            ? "bg-black10 hover:bg-black hover:text-white"
            : "bg-white10 text-white hover:bg-white hover:text-black"
        )}
      >
        <span className={clsx("h-6 w-6 flex items-center justify-middle")}>
          <ClearAll />
        </span>
      </div>
    );
  }

  function RenderCloseIcon() {
    return (
      <div
        className={clsx(
          "p-2 rounded-full",
          "bg-white10 text-white hover:bg-white hover:text-black"
        )}
      >
        <span className={clsx("h-6 w-6 flex items-center justify-middle")}>
          <Clear />
        </span>
      </div>
    );
  }
};

export default Navbar;
