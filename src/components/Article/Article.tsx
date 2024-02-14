"use client";

import NextLink from "next/link";
import { ArrowLeft } from "react-feather";
import React, { type ReactNode } from "react";
import { usePathname } from "next/navigation";
import {
  Container,
  View,
  Text,
  Hidden,
  ActionBar,
  Button,
  useToggle,
} from "reshaped";
import LayoutMenuModal from "@/components/LayoutMenuModal";
import useArticleNavigation from "@/hooks/useArticleNavigation";
import type { SubmenuItemsMap } from "@/types";
import s from "./Article.module.css";

type Props = {
  children: ReactNode;
  availableArticles: SubmenuItemsMap;
};

const Article = (props: Props) => {
  const { children, availableArticles } = props;
  const pathname = usePathname();
  const { routeItems, parentRoute } = useArticleNavigation(availableArticles);
  const { activate, deactivate, active } = useToggle();
  const titleRef = React.useRef<HTMLHeadingElement | null>(null);
  const headerRef = React.useRef<HTMLDivElement | null>(null);
  const articleInfo = routeItems?.find((item) => item.href === pathname);

  const filteredChildren = React.Children.toArray(children).filter(
    (child) => child !== "\n",
  );

  React.useEffect(() => {
    if (!titleRef.current || !headerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            deactivate();
          } else {
            activate();
          }
        });
      },
      { rootMargin: `-${headerRef.current.clientHeight}px` },
    );

    observer.observe(titleRef.current);
    return () => observer.disconnect();
  }, [activate, deactivate]);

  return (
    <>
      <Hidden hide={{ s: false, l: true }}>
        <View
          position="fixed"
          insetTop={0}
          insetStart={0}
          insetEnd={0}
          zIndex={10}
        >
          <ActionBar position="top" attributes={{ ref: headerRef }}>
            <View gap={4} align="center" direction="row">
              {routeItems && routeItems.length > 1 ? (
                <Button.Aligner>
                  <NextLink href={parentRoute} passHref legacyBehavior>
                    <Button icon={ArrowLeft} variant="ghost" />
                  </NextLink>
                </Button.Aligner>
              ) : (
                <LayoutMenuModal />
              )}
              <View.Item grow>
                <Text
                  variant="body-3"
                  weight="medium"
                  maxLines={1}
                  className={[s.title, active && s["title--active"]]}
                >
                  {articleInfo?.title}
                </Text>
              </View.Item>
            </View>
          </ActionBar>
        </View>
      </Hidden>
      <Container width="760px">
        <View
          gap={8}
          padding={{ s: 0, l: 10 }}
          paddingBlock={{ s: 20, l: 15 }}
          as="main"
        >
          {articleInfo && (
            <View gap={1}>
              <Text
                as="h1"
                variant="featured-1"
                weight="bold"
                attributes={{ ref: titleRef }}
              >
                {articleInfo.title}
              </Text>
              {articleInfo.created && (
                <Text variant="body-3" color="neutral-faded">
                  {articleInfo.created.toLocaleString("en-us", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </Text>
              )}
            </View>
          )}
          <View gap={6}>{filteredChildren}</View>
        </View>
      </Container>
    </>
  );
};

export default Article;
