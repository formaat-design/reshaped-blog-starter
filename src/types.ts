import type { IconProps } from "reshaped";

export type MenuItem = {
  icon?: IconProps["svg"];
  title: string;
  href: string;
};

type MenuSection = {
  title: string;
  items: MenuItem[];
};

export type Menu = Array<MenuItem | MenuSection>;

export type SubmenuItem = {
  title: string;
  href: string;
  created: Date;
};

export type SubmenuItemsMap = Record<string, SubmenuItem[] | undefined>;

export type Config = {
  app: {
    title: string;
    subtitle?: string;
    thumbnailUrl?: string;
  };
  meta: {
    url: string;
    title: string;
    description: string;
    twitter?: {
      username?: string;
    };
  };
  menu: Menu;
};
