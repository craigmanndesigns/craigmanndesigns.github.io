import * as React from "react";
import { graphql } from "gatsby";
import clsx from "clsx";

import {
  StoryblokComponent,
  storyblokEditable,
  useStoryblokState,
} from "gatsby-source-storyblok";

import Layout from "../layout/Layout";

const IndexPage = ({ data }) => {
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

export default IndexPage;

export const Head = () => (
  <>
    <title>{"Craig Mann Designs"}</title>
    <meta name="Craig Mann Designs" content="My work portfolio" />
  </>
);

export const query = graphql`
  query HomeQuery {
    storyblokEntry(full_slug: { eq: "home" }) {
      content
      name
      full_slug
      uuid
      id
      internalId
    }
  }
`;
