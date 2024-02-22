import {
  Home,
  Feather,
  Twitter,
  Linkedin,
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
    title: "Navin's Joueney",
    subtitle: "Documenting everything on the way",
    thumbnailUrl: "/img/logo.svg",
  },
  meta: {
    url: "https://reshaped-blog-starter.vercel.app",
    title: "Navin's Journey",
    description: "Documenting everything on the way",
    twitter: {
      username: "0xNavin",
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
          href: "https://twitter.com/0xNavin",
        },
        {
          icon: Linkedin,
          title: "LinkedIn",
          href: "https://www.linkedin.com/in/thenavin/",
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
