import { usePathname } from "next/navigation";
import type { SubmenuItemsMap, Menu } from "../types";
import config from "../config";

const getTitle = (menu: Menu, pathname: string): string | undefined => {
  for (let item of menu) {
    if ("href" in item && item.href === pathname) return item.title;

    if ("items" in item) {
      const title = getTitle(item.items, pathname);
      if (title) return title;
    }
  }
};

const useArticleNavigation = (availableRoutes: SubmenuItemsMap) => {
  const pathname = usePathname();
  const routeChain = pathname.slice(1).split("/");
  const topLevelRoute = routeChain[0];
  const parentRoute = `/${routeChain.slice(0, -1).join("/")}`;
  const routeItems = availableRoutes[topLevelRoute];
  const title = getTitle(
    config.menu,
    pathname.split("/").slice(0, 2).join("/"),
  );
  const isArticle =
    routeItems?.findIndex((item) => item.href === pathname) !== -1;

  return { title, isArticle, routeItems, parentRoute, pathname };
};

export default useArticleNavigation;
