import React, { useEffect, useState } from "react";
import { Link } from "gatsby-link";
import { storyblokEditable, StoryblokComponent } from "gatsby-source-storyblok";
import clsx from "clsx";

const ListItem = ({ blok, sectionTheme }) => {
  const [url, setURL] = useState(blok.link.cached_url);
  const [anchorUrl, setAnchorUrl] = useState("");

  useEffect(() => {
    if (blok.link.anchor) {
      // setAnchorURL(url.substring(0, url.length - 1));
      setAnchorUrl("#" + blok.link.anchor);
    }
  }, []);

  return (
    <div {...storyblokEditable(blok)} className={clsx("flex flex-col gap-y-2")}>
      <Link
        className={clsx(
          "px-4 pt-2 pb-4 rounded",
          "flex",
          sectionTheme ? "hover:bg-accent10" : "text-white hover:bg-white10"
        )}
        to={blok.link.anchor ? anchorUrl : url}
      >
        <span className={clsx("flex items-center justify-middle w-full")}>
          {blok.text}
        </span>
      </Link>

      {blok.hasSubNav && (
        <ul className={clsx("bg-black10")}>
          <li className={clsx("flex flex-col gap-y-2 px-2 py-2 border-y")}>
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
