import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { MenuItem, Text, View } from "reshaped";

type Props = {
  title: string;
  date: Date;
  href: string;
};

const ArticleItem = (props: Props) => {
  const { title, date, href } = props;
  const pathname = usePathname();

  return (
    <MenuItem.Aligner>
      <NextLink href={href} passHref legacyBehavior>
        <MenuItem roundedCorners selected={href === pathname} color="neutral">
          <View gap={0.5}>
            <Text>{title}</Text>
            <Text color="neutral-faded" weight="regular">
              {date.toLocaleString("en-us", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </Text>
          </View>
        </MenuItem>
      </NextLink>
    </MenuItem.Aligner>
  );
};

export default ArticleItem;
