"use client";

import { useState, type ReactNode } from "react";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import {
  Avatar,
  View,
  Text,
  MenuItem,
  Icon,
  ScrollArea,
  Button,
  useTheme,
  useIsomorphicLayoutEffect,
  type MenuItemProps,
  Hidden,
} from "reshaped";
import { ArrowUpRight, Sun, Moon } from "react-feather";
import config from "../../config";

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
  const { colorMode, setColorMode } = useTheme();
  const [mounted, setMounted] = useState(false);

  const handleModeClick = () => {
    const nextColorMode = colorMode === "dark" ? "light" : "dark";

    localStorage.setItem("__rs-color-mode", nextColorMode);
    setColorMode(nextColorMode);
  };

  useIsomorphicLayoutEffect(() => {
    setMounted(true);
  }, []);

  return (
    <ScrollArea scrollbarDisplay="hover">
      <View
        padding={{ s: 6, l: 6 }}
        paddingBlock={{ s: 6, l: 3 }}
        gap={1}
        grow
        overflow="auto"
      >
        <View paddingBottom={5} direction="row" gap={2} align="center">
          {config.app.thumbnailUrl && (
            <Avatar size={9} src={config.app.thumbnailUrl} />
          )}

          <View.Item grow>
            <Text variant="body-3" weight="bold">
              {config.app.title}
            </Text>
            {config.app.subtitle && (
              <Text variant="body-3" color="neutral-faded">
                {config.app.subtitle}
              </Text>
            )}
          </View.Item>

          <Hidden visibility hide={!mounted}>
            <Button.Aligner side={["end", "top", "bottom"]}>
              <Button
                icon={colorMode === "dark" ? Sun : Moon}
                variant="ghost"
                onClick={handleModeClick}
              />
            </Button.Aligner>
          </Hidden>
        </View>

        {config.menu.map((item) => {
          if ("items" in item) {
            return (
              <Section title={item.title} key={item.title}>
                {item.items?.map((link) => (
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
