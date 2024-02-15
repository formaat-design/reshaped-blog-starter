import type { Config } from "./types";
import { Home, Book } from "react-feather";

const config: Config = {
  app: {
    name: "Reshaped",
  },
  meta: {
    url: "https://vercel.com/reshaped/reshaped-blog-starter",
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
      icon: Book,
      title: "Writing",
      href: "/article",
    },
    {
      title: "Me",
      items: [
        {
          icon: Home,
          title: "Home",
          href: "/home",
        },
        {
          icon: Book,
          title: "Writing",
          href: "/writing",
        },
      ],
    },
  ],
};

export default config;
