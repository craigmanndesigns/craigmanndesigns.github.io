import React, { useEffect, useState, useRef } from "react";
import { storyblokEditable, StoryblokComponent } from "gatsby-source-storyblok";
import clsx from "clsx";
import InstaGrid from "./insta_grid";

const InstaFeed = ({ blok }) => {
  const [instaItems, setInstaItems] = useState([]);

  const userId = process.env.GATSBY_INSTA_USER_ID;
  const accessToken = process.env.GATSBY_INSTA_ACCESS_CODE;
  const instaUrl = `https://graph.facebook.com/v21.0/${userId}/media?fields=id,caption,media_type,media_url&access_token=${accessToken}`;


  useEffect(() => {
    const fetchMedia = async (id) => {
      const mediaUrl = `https://graph.facebook.com/v21.0/${userId}/media?fields=id,caption,media_type,media_url&access_token=${accessToken}`;

      const res = await fetch(mediaUrl);
      const json = await res.json();

      const instaItem = {
        permalink: json.permalink,
        mediaUrl: json.media_url,
      };
      return instaItem;
    };
    const doFetch = async () => {
      if (!userId || !accessToken) {
        console.log("userId or accessToken is undefined: ", {
          userId,
          accessToken,
        });
        return;
      }
      const res = await fetch(instaUrl);
      const json = (await res.json()).data;

      const fetchedItems = [];

      if (json != undefined) {
        for (let i = 0; i < json.length && i < 9; i++) {
          const item = json[i];
          const itemId = item.id;

          const instaItem = await fetchMedia(itemId);
          fetchedItems.push(instaItem);
        }
      }
      setInstaItems(fetchedItems);
    };
    doFetch();
  }, [userId, accessToken, instaUrl])

  return (
    <div {...storyblokEditable(blok)} key={blok._uid} className={clsx()}>
      <InstaGrid items={instaItems} />
    </div>
  );
};

export default InstaFeed;
