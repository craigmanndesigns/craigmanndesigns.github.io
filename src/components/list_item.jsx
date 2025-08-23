import React, { useEffect, useState } from "react";
import { Link } from "gatsby-link";
import { storyblokEditable, StoryblokComponent } from "gatsby-source-storyblok";
import clsx from "clsx"
import { NavigateNext, East } from "@mui/icons-material";

const ListItem = ({ blok, sectionTheme }) => {
  const [url, setURL] = useState("/" + blok.link.cached_url);
  const [anchorUrl, setAnchorUrl] = useState("");
  const [isHover, setIsHover] = useState(false);
  const [isSubItem, setIsSubItem] = useState(false);

  function onMouseEnter() {
    setIsHover(true);
  }

  function onMouseLeave() {
    setIsHover(false);
  }

  useEffect(() => {
    if (blok.link.anchor) {
      // setAnchorURL(url.substring(0, url.length - 1));
      setAnchorUrl("#" + blok.link.anchor);
    } else {
      setAnchorUrl(blok.link.cached_url);
    }
  }, []);
  console.log(isSubItem)
  return (
    <div {...storyblokEditable(blok)} className={clsx("flex flex-col")}>
      <Link
        className={clsx(
          "py-2 flex",
          sectionTheme ? "hover:" : "text-white hover:bg-white10"
        )}
        to={blok.link.anchor ? anchorUrl : url}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <span className={clsx(
          isSubItem && "font-normal",
          "flex items-center justify-middle mr-2"
        )}>
          {blok.text}
        </span>
        <span className={clsx(
          isHover ? "-translate-x-[0] scale-x-[1] opacity-1" : "-translate-x-[50%] scale-x-[0] opacity-0",
          "transition-all duration-200 ease-in-out",
        )}>
          {blok.link.anchor ? <NavigateNext /> : <East />}
        </span>
      </Link>

      {blok.hasSubNav && (
        <ul className={clsx("")}>
          <li className={clsx("flex flex-col sub-item")}>
            {blok.sub_nav.map((blok) => (
              <StoryblokComponent blok={blok} sectionTheme={sectionTheme} />
            ))}
          </li>
        </ul>
      )}
    </div>
  );
};

export default ListItem;
