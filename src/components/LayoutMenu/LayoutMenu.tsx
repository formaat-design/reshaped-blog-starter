"use client";

import type { ReactNode } from "react";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import {
  View,
  Text,
  MenuItem,
  Icon,
  ScrollArea,
  type MenuItemProps,
} from "reshaped";
import { ArrowUpRight } from "react-feather";
import config from "@/config";

const Item = (
  props: {
    href: string;
  } & Pick<MenuItemProps, "icon" | "children">,
) => {
  const { icon, href, children } = props;
  const pathname = usePathname();
  const external = !href.startsWith("/");

  return (
    <MenuItem.Aligner>
      <NextLink href={href} legacyBehavior passHref>
        <MenuItem
          roundedCorners
          icon={icon}
          selected={
            href === "/" ? pathname === href : pathname.startsWith(href)
          }
          color="neutral"
          attributes={external ? { target: "_blank" } : undefined}
          endSlot={
            external ? (
              <Icon svg={ArrowUpRight} size={4} color="neutral-faded" />
            ) : null
          }
        >
          {children}
        </MenuItem>
      </NextLink>
    </MenuItem.Aligner>
  );
};

const Section = (props: { title?: string; children: ReactNode }) => {
  const list = <View gap={1}>{props.children}</View>;

  if (!props.title) return list;

  return (
    <View gap={2} paddingTop={5}>
      <Text variant="caption-1" weight="medium">
        {props.title}
      </Text>
      {list}
    </View>
  );
};

const LayoutMenu = () => {
  return (
    <ScrollArea scrollbarDisplay="hover">
      <View
        padding={{ s: 6, l: 6 }}
        paddingBlock={{ s: 6, l: 3 }}
        gap={1}
        grow
        overflow="auto"
      >
        <View paddingBottom={5}>
          <Text variant="body-3" weight="bold">
            Reshaped
          </Text>
        </View>

        {config.menu.map((item) => {
          if ("items" in item) {
            return (
              <Section title={item.title} key={item.title}>
                {item.items.map((link) => (
                  <Item href={link.href} icon={link.icon} key={link.title}>
                    {link.title}
                  </Item>
                ))}
              </Section>
            );
          }

          return (
            <Item href={item.href} icon={item.icon} key={item.title}>
              {item.title}
            </Item>
          );
        })}
      </View>
    </ScrollArea>
  );
};

export default LayoutMenu;
