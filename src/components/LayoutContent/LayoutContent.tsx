"use client";

import { ReactNode } from "react";
import { View, ScrollArea, Hidden } from "reshaped";
import type { SubmenuItemsMap } from "../../types";
import useArticleNavigation from "../../hooks/useArticleNavigation";

type Props = {
  children: ReactNode;
  availableRoutes: SubmenuItemsMap;
};

const LayoutContent = (props: Props) => {
  const { children, availableRoutes } = props;
  const { isArticle, pathname } = useArticleNavigation(availableRoutes);

  return (
    <Hidden hide={{ s: !isArticle, l: false }}>
      {(className) => (
        <View grow className={className} height="100dvh">
          <ScrollArea scrollbarDisplay="hover" key={pathname}>
            {children}
          </ScrollArea>
        </View>
      )}
    </Hidden>
  );
};

export default LayoutContent;
