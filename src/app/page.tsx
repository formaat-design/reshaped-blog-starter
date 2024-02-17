import fs from "fs";
import path from "path";
import MdxContent from "../components/MdxContent";

export default async function IndexRoute() {
  const rootPath = process.cwd();
  const mdxPath = path.resolve(rootPath, "src/posts/index.mdx");
  const source = fs.readFileSync(mdxPath, "utf-8");

  return <MdxContent source={source} />;
}
