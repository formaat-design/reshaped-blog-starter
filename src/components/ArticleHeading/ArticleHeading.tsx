import { ReactNode } from "react";
import { Text, type TextProps, View } from "reshaped";

type Props = { level: 1 | 2 | 3 | 4 | 5 | 6; children: ReactNode };
type TagName = `h${Props["level"]}`;

const variantMap: Record<Props["level"], TextProps["variant"]> = {
  1: "featured-1",
  2: "featured-2",
  3: "featured-3",
  4: "body-1",
  5: "body-2",
  6: "body-2",
};

const ArticleHeading = (props: Props) => {
  const { level, children } = props;
  const as = `h${Math.min(6, level + 1)}` as TagName;
  const variant = variantMap[level];

  return (
    <View.Item gapBefore={8}>
      <Text as={as} variant={variant} weight="bold">
        {children}
      </Text>
    </View.Item>
  );
};

export default ArticleHeading;
