import { ReactNode } from "react";
import { View, Text, Link, Divider } from "reshaped";
import s from "./ArticleBio.module.css";

type Props = {
  title: string;
  children?: ReactNode;
  items?: Array<{
    title: string;
    label?: string;
    href?: string;
    date?: string;
  }>;
};

const ArticleBio = (props: Props) => {
  const { title, children, items } = props;
  const dateLength =
    items?.reduce((acc, cur) => {
      const length = cur.date?.length;
      return length && length > acc ? length : acc;
    }, 0) || 0;

  return (
    <Text variant="body-2" className={s.root}>
      <Text
        as="span"
        color="disabled"
        variant="body-2"
        weight="medium"
        className={s.title}
      >
        {title}
      </Text>
      {children}
      {items && (
        <View gap={2}>
          {items?.map((item) => {
            const dateContent = item.date && (
              <View align="end">
                <Text
                  color="neutral-faded"
                  variant={{ s: "body-3", m: "body-2" }}
                  className={s.date}
                >
                  {item.date.padEnd(dateLength, "\u00A0")}
                </Text>
              </View>
            );

            return (
              <View
                gap={{ s: 1, l: 4 }}
                direction={{ s: "column", l: "row" }}
                key={item.title}
              >
                <View
                  direction="row"
                  justify="space-between"
                  wrap={false}
                  gap={4}
                  align="center"
                  grow
                >
                  <Text
                    color="neutral"
                    variant={{ s: "body-3", m: "body-2" }}
                    weight="medium"
                  >
                    {item.href ? (
                      <Link color="inherit" variant="plain" href={item.href}>
                        {item.title}
                      </Link>
                    ) : (
                      item.title
                    )}
                  </Text>

                  {(item.label || item.date) && (
                    <View.Item grow>
                      <Divider />
                    </View.Item>
                  )}

                  {item.label ? (
                    <Text
                      color="neutral-faded"
                      variant={{ s: "body-3", m: "body-2" }}
                    >
                      {item.label}
                    </Text>
                  ) : (
                    dateContent
                  )}
                </View>

                {item.label && dateContent}
              </View>
            );
          })}
        </View>
      )}
    </Text>
  );
};

export default ArticleBio;
