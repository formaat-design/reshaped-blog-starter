This is a personal blog starter repository built with Next.js and Reshaped.
Blog design is inpired by brianlovin.com and onur.dev.

## Getting started

> You can use `example` directory as a reference for installing the package.

Create a new repository and install `@reshaped/blog` package.

```
## Create a project folder
mkdir blog && cd blog

## Install the package
yarn add @reshaped/blog
```

Add scripts to your `package.json` file:

```json
{
  "scripts": {
    "dev": "reshaped-blog dev",
    "build": "reshaped-blog build",
    "start": "reshaped-blog start"
  }
}
```

Customize the blog configuration and top-level menu with the `blog.config.ts` file.
Here is an example of the config:

```jsx
import {
  Home,
  Feather,
  Twitter,
  GitHub,
  Figma,
  CheckSquare,
  Mic,
  Briefcase,
  Layers,
  Package,
} from "react-feather";

const config = {
  app: {
    title: "Reshaped",
    subtitle: "Blog starter kit",
    thumbnailUrl: "/img/logo.svg",
  },
  meta: {
    url: "https://reshaped-blog-starter.vercel.app",
    title: "Reshaped",
    description: "Blog starter built on top of Next.js and Reshaped",
    twitter: {
      username: "blvdmitry",
    },
  },
  menu: [
    {
      icon: Home,
      title: "Home",
      href: "/",
    },
    {
      icon: Feather,
      title: "Writing",
      href: "/article",
    },
    {
      icon: Layers,
      title: "Stack",
      href: "/stack",
    },
    {
      title: "Projects",
      items: [
        {
          icon: Package,
          title: "Reshaped",
          href: "https://reshaped.so",
        },
        {
          icon: CheckSquare,
          title: "Design System Checklist",
          href: "https://www.designsystemchecklist.com",
        },
        {
          icon: Mic,
          title: "Design System Interviews",
          href: "https://reshaped.so/blog",
        },
        {
          icon: Briefcase,
          title: "Formaat Design",
          href: "https://formaat.design",
        },
      ],
    },
    {
      title: "Online",
      items: [
        {
          icon: Twitter,
          title: "Twitter",
          href: "https://twitter.com/blvdmitry",
        },
        {
          icon: GitHub,
          title: "GitHub",
          href: "https://github.com/formaat-design",
        },
        {
          icon: Figma,
          title: "Figma",
          href: "https://www.figma.com/@reshaped",
        },
      ],
    },
  ],
};

export default config;
```

Add new articles by adding `mdx` files in the `posts` directory or inside its subdirectories.
`index.mdx` is the reserver filename for the homepage.

```
/posts
- index.mdx
- stack.mdx
- articles
  - react.mdx
  - typescript.mdx
  - vanilla.mdx
```

Run the `dev` script to start the blog locally and use `build` and `start` scripts for deploying it.

```
yarn dev
```

## Working with the content

- Markdown files support `frontmatter` format, where you can pass the article `title` and `created` date properties, they will be displayed in the articles list and on the article route
- Markdown files support the vanilla markdown features, as well as a custom `Bio` component:

```jsx
<Bio
  title="Work"
  items={[
    {
      title: "Reshaped",
      href: "https://reshaped.so",
      label: "Front-end Engineer",
      date: "2020 –",
    },
    {
      title: "Figma",
      href: "https://figma.com",
      label: "Engineering Manager",
      date: "2020 – 22",
    },
    {
      title: "Vercel",
      href: "https://vercel.com",
      label: "Senior Front-end Engineer",
      date: "2018 – 20",
    },
  ]}
/>
```

## Using without the package

In case you don't want to use the package through NPM, you can fork the repo and modify the source code based on your neeeds.
Same `dev`, `build`, `start` scripts are available in the root `package.json` file
