import * as React from "react";
import PropTypes from "prop-types";
import { storyblokInit, apiPlugin } from "gatsby-source-storyblok";
import { graphql, useStaticQuery } from "gatsby";

import clsx from "clsx";

import BrutalTheme from "../styles/brutal_theme";

import Teaser from "../components/teaser";
import Grid from "../components/grid";
import Card from "../components/card";
import Navbar from "../components/navbar";
import NavItem from "../components/nav_item";
import Section from "../components/sections/section";
import Hero from "../components/sections/hero";
import Header from "../components/header";
import HeaderItem from "../components/header_item";
import Button from "../components/button";
import SocialMediaLink from "../components/social_media_link";
import ButtonWrapper from "../components/sections/button_wrapper";
import Separator from "../components/separator";
import Tag from "../components/tag";
import configuration from "../../gatsby-config";
import Cursor from "../components/cursor";
import WorkHero from "../components/sections/work_hero";
import ContentSection from "../components/sections/contentSection";
import ListItem from "../components/list_item";
import Image from "../components/image";
import ContactForm from "../components/sections/contact_form";
import Video from "../components/video";
import InstaFeed from "../components/insta_feed";
import InstaGrid from "../components/insta_grid";
import Footer from "../components/sections/footer";

const sbConfig = configuration.plugins.find(
  (item) => item.resolve === "gatsby-source-storyblok"
);

storyblokInit({
  accessToken: sbConfig.options.accessToken,
  apiOptions: {
    region: "us", // Pass this key/value if your space was created under US region
  },
  use: [apiPlugin],
  components: {
    teaser: Teaser,
    grid: Grid,
    card: Card,
    navbar: Navbar,
    nav_item: NavItem,
    section: Section,
    hero: Hero,
    header: Header,
    header_item: HeaderItem,
    button: Button,
    social_media_link: SocialMediaLink,
    button_wrapper: ButtonWrapper,
    separator: Separator,
    tag: Tag,
    work_hero: WorkHero,
    contentSection: ContentSection,
    image: Image,
    list_item: ListItem,
    contact_form: ContactForm,
    video: Video,
    insta_feed: InstaFeed,
    insta_grid: InstaGrid,
    footer: Footer,
  },
});

const Layout = ({ children }) => {
  const [sectionThem, setSectionThem] = React.useState();

  const { navigation } = useStaticQuery(graphql`
    query Navigation {
      navigation: storyblokEntry(slug: { eq: "navbar" }) {
        name
        full_slug
        content
      }
    }
  `);

  let navbarBlok = {
    ...navigation,
    content: parseJson(navigation.content),
  };

  return (
    <>
      <Cursor />
      <BrutalTheme>
        <Navbar blok={navbarBlok.content} />
        <main className={clsx("main")}>{children}</main>
        <Footer />
      </BrutalTheme>
    </>
  );
};

var parseJson = function (payload) {
  return isString(payload) && JSON.parse(payload);
};
function isString(content) {
  return typeof content === "string";
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
