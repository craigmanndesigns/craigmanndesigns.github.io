import * as React from "react";
import { graphql } from "gatsby";
import clsx from "clsx";
import {
  StoryblokComponent,
  storyblokEditable,
  useStoryblokState,
} from "gatsby-source-storyblok";

import Layout from "../layout/Layout";

const StoryblokEntry = ({ data }) => {
  let story = data.storyblokEntry;
  story = useStoryblokState(story);

  const components = story.content.body.map((blok) => (
    <StoryblokComponent blok={blok} key={blok._uid} />
  ));

  return (
    <Layout>
      <div {...storyblokEditable(story.content)} className={clsx("cont")}>
        {components}
      </div>
    </Layout>
  );
};

export default StoryblokEntry;

export const query = graphql`
  query ($full_slug: String!) {
    storyblokEntry(full_slug: { eq: $full_slug }) {
      content
      name
      full_slug
      uuid
      id
      internalId
      field_component
    }
  }
`;
