import type { GatsbyConfig } from "gatsby";

// require = require('esm');

// const path = require('path');

// const NODE_ENV = process.env.NODE_ENV || 'development';
// const BRANCH = process.env.STORYBLOK_BRANCH_NAME || 'development';

// const isProdEnv = NODE_ENV === 'production';
// const isProdBranch = BRANCH === 'PRODUCTION';

// require("dotenv").config({
//   path: `.env.${process.env.NODE_ENV}`,
// })

const config: GatsbyConfig = {
  siteMetadata: {
    title: `brutalism-cmd`,
    siteUrl: `https://www.yourdomain.tld`
  },
  // More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
  // If you use VSCode you can also use the GraphQL plugin
  // Learn more at: https://gatsby.dev/graphql-typegen
  graphqlTypegen: true,
  plugins: ["gatsby-plugin-vanilla-extract", {
    resolve: 'gatsby-plugin-manifest',
    options: {
      "icon": "src/images/icon.png"
    }
  },
  `gatsby-plugin-gatsby-cloud`,
  {
    resolve: 'gatsby-source-storyblok',
    options: {
      // accessToken: process.env.GATSBY_STORYBLOK_LOCAL_PUBLIC_TOKEN,
      accessToken: 'I0LxhZHYpfAbU0QKwSQ1Gwtt',
      // accessToken: 'fAabqrghOpEV3mJrHJ6XIgtt',
      version: process.env.NODE_ENV === 'production' ? 'published' : 'draft',
      localAssets: true, 
    }
  },
  `gatsby-plugin-sass`,
  `gatsby-plugin-postcss`,
]
};

export default config;
