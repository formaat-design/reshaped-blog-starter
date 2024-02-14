"use client";

import { View, Text, ScrollArea, Hidden } from "reshaped";
import LayoutMenuModal from "@/components/LayoutMenuModal";
import ArticleItem from "@/components/ArticleItem";
import useArticleNavigation from "@/hooks/useArticleNavigation";
import type { Props } from "./LayoutSubmenu.types";

const LayoutSubmenu = (props: Props) => {
  const { availableRoutes } = props;
  const { title, isArticle, routeItems } =
    useArticleNavigation(availableRoutes);

  if (!routeItems || routeItems.length <= 1) return null;

  return (
    <>
      <Hidden
        hide={{
          /**
           * Hide on small viewports if we're on the article route
           */
          s: isArticle,
          l: false,
        }}
      >
        {(className) => (
          <View
            width={{ s: "100%", l: "320px", xl: "384px" }}
            height="100%"
            backgroundColor="elevation-base"
            className={className}
          >
            <ScrollArea scrollbarDisplay="hover">
              <View padding={{ s: 4, l: 6 }} paddingBlock={3} gap={6}>
                <View direction="row" gap={4} align="center">
                  <Hidden hide={{ s: false, l: true }}>
                    <LayoutMenuModal />
                  </Hidden>
                  <View.Item grow>
                    <Text variant="body-3" weight="bold">
                      {title}
                    </Text>
                  </View.Item>
                </View>

                <View gap={1}>
                  {routeItems.map((item) => (
                    <ArticleItem
                      key={item.href}
                      title={item.title}
                      date={item.created}
                      href={item.href}
                    />
                  ))}
                </View>
              </View>
            </ScrollArea>
          </View>
        )}
      </Hidden>
    </>
  );
};

export default LayoutSubmenu;
