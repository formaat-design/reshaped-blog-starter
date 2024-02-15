import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { SubmenuItemsMap } from "@/types";

const getArticleData = (filePath: string) => {
  if (!fs.existsSync(filePath)) return;

  const file = fs.readFileSync(filePath, "utf-8");
  const { data } = matter(file);

  return {
    title: data.title,
    created: data.created,
  };
};

export const getArticlesList = () => {
  const projectRoot = process.cwd();
  const appSrcRoot = path.resolve(projectRoot, "src", "app");
  const dirs = fs.readdirSync(appSrcRoot);
  const availableSubmenuPages: SubmenuItemsMap = {};

  const rootPagePath = path.join(appSrcRoot, "page.mdx");
  const rootArticle = getArticleData(rootPagePath);

  if (rootArticle) {
    availableSubmenuPages[""] = [
      {
        href: "/",
        ...rootArticle,
      },
    ];
  }

  dirs.forEach((dir) => {
    const dirPath = path.join(appSrcRoot, dir);

    if (!fs.existsSync(dirPath)) return;

    const isDir = fs.lstatSync(dirPath).isDirectory();

    if (!isDir) return;
    // Ignore Next route groups
    if (dir.startsWith("(")) return;
    // Ignore Next parametrized routes
    if (dir.startsWith("[")) return;
    // Ignore Next parallel routes
    if (dir.startsWith("@")) return;

    const menuPagePath = path.join(dirPath, "page.mdx");
    const menuArticle = getArticleData(menuPagePath);

    availableSubmenuPages[dir] = [];

    if (menuArticle) {
      availableSubmenuPages[dir]?.push({
        href: `/${dir}`,
        ...menuArticle,
      });
    }

    const pageDirs = fs.readdirSync(dirPath);
    pageDirs.forEach((pageDir) => {
      const pagePath = path.join(dirPath, pageDir, "page.mdx");
      const article = getArticleData(pagePath);
      if (!article) return;

      availableSubmenuPages[dir]?.push({
        href: `/${dir}/${pageDir}`,
        ...article,
      });
    });
  });

  return availableSubmenuPages;
};
