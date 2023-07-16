import * as React from "react";
import { graphql } from "gatsby";
import clsx from "clsx";

import {
  StoryblokComponent,
  storyblokEditable,
  useStoryblokState,
} from "gatsby-source-storyblok";

import Layout from "../layout/Layout";

const IndexPage = ({ data, location }) => {
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
    <title>Hello World</title>
    <meta name="description" content="Hello World" />
    <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
    />
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
