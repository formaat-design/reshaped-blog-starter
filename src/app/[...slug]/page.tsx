import fs from "fs";
import path from "path";
import { View, Text } from "reshaped";
import MdxContent from "../../components/MdxContent";

export default async function ArticleRoute({
  params,
}: {
  params: { slug: string[] };
}) {
  const [topLevelName, subLevelName] = params.slug.slice(0, 2);
  const rootPath = process.cwd();
  const articleListPath = path.resolve(rootPath, `src/posts/${topLevelName}`);

  // Article list
  if (!subLevelName && fs.existsSync(articleListPath)) {
    return null;
  }

  const mdxPath = path.resolve(
    rootPath,
    subLevelName
      ? `src/posts/${topLevelName}/${subLevelName}.mdx`
      : `src/posts/${topLevelName}.mdx`,
  );

  if (!fs.existsSync(mdxPath)) {
    return (
      <View height="100dvh" align="center" justify="center">
        <Text variant="featured-1" weight="medium">
          Page not found 😔
        </Text>
      </View>
    );
  }

  const source = fs.readFileSync(mdxPath, "utf-8");
  return (
    <MdxContent
      source={source}
      parentUrl={subLevelName ? `/${topLevelName}` : undefined}
    />
  );
}
