import type { ReactNode } from "react";
import NextLink from "next/link";
import {
  View,
  Button,
  Text,
  MenuItem,
  Icon,
  type MenuItemProps,
} from "reshaped";
import { Home, Book, ArrowUpRight } from "react-feather";

const Item = (
  props: {
    href: string;
    external?: boolean;
  } & Pick<MenuItemProps, "icon" | "children" | "selected">,
) => {
  const node = (
    <MenuItem
      roundedCorners
      icon={props.icon}
      selected={props.selected}
      color="neutral"
      href={props.external ? props.href : undefined}
      attributes={props.external ? { target: "_blank" } : undefined}
      endSlot={
        props.external ? (
          <Icon svg={ArrowUpRight} size={4} color="neutral-faded" />
        ) : null
      }
    >
      {props.children}
    </MenuItem>
  );

  return (
    <MenuItem.Aligner>
      {props.external ? (
        node
      ) : (
        <NextLink href={props.href} legacyBehavior passHref>
          {node}
        </NextLink>
      )}
    </MenuItem.Aligner>
  );
};

const Section = (props: { title?: string; children: ReactNode }) => {
  const list = <View gap={1}>{props.children}</View>;

  if (!props.title) return list;

  return (
    <View gap={2}>
      <Text variant="caption-1" weight="medium">
        {props.title}
      </Text>
      {list}
    </View>
  );
};

const Menu = () => {
  return (
    <View width="287px" divided height="100%">
      <View padding={6} paddingBlock={3} gap={6} grow overflow="auto">
        <Text variant="body-3" weight="bold">
          Reshaped
        </Text>

        <Section>
          <Item href="/" selected icon={Home}>
            Home
          </Item>
          <Item href="/writing" icon={Book}>
            Writing
          </Item>
        </Section>

        <Section title="Me">
          <Item href="/" icon={Home}>
            Home
          </Item>
          <Item href="/writing" icon={Book} external>
            Writing
          </Item>
        </Section>
      </View>
      <View padding={2}>
        <Button fullWidth>Sign in</Button>
      </View>
    </View>
  );
};

export default Menu;
