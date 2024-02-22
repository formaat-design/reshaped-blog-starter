import type { Metadata, Viewport } from "next";
import { View, Hidden } from "reshaped";
import App from "../components/App";
import LayoutMenu from "../components/LayoutMenu";
import LayoutSubmenu from "../components/LayoutSubmenu";
import LayoutContent from "../components/LayoutContent";
import { getArticlesList } from "../utilities/articles.server";
import config from "../config";

export const metadata: Metadata = {
  metadataBase: new URL(config.meta.url),
  title: {
    template: `%s - ${config.meta.title}`,
    default: config.meta.title,
  },
  description: config.meta.description,
  robots: {
    follow: true,
  },
  openGraph: {
    title: {
      template: `%s - ${config.meta.title}`,
      default: config.meta.title,
    },
    description: config.meta.description,
    type: "website",
    url: "/",
    siteName: config.meta.description,
  },
  alternates: {
    canonical: "/",
  },
  twitter: {
    card: "summary_large_image",
    site: config.meta.twitter?.username && `@${config.meta.twitter.username}`,
    creator:
      config.meta.twitter?.username && `@${config.meta.twitter.username}`,
  },
};

export const viewport: Viewport = {
  themeColor: "black",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const availableRoutes = getArticlesList();

  return (
    <html lang="en" data-rs-theme="blog" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
							const matcher = window.matchMedia("(prefers-color-scheme: dark)"); 
							const systemColorMode = matcher.matches ? "dark" : "light";
							const storedColorMode = localStorage.getItem("__rs-color-mode"); 

							document.documentElement.setAttribute("data-rs-color-mode", storedColorMode || systemColorMode);
							matcher.addEventListener("change", () => { 
							 	document.body.setAttribute("data-rs-color-mode", systemColorMode);
							});
					`,
          }}
        />
      </head>
      <body>
        <App>
          <View
            direction="row"
            divided
            height="100dvh"
            align="stretch"
            overflow="hidden"
          >
            <Hidden hide={{ s: true, l: false }}>
              {(className) => (
                <View
                  width={{ s: "240px", xl: "287px" }}
                  height="100%"
                  backgroundColor="elevation-base"
                  className={className}
                >
                  <LayoutMenu />
                </View>
              )}
            </Hidden>

            <LayoutSubmenu availableRoutes={availableRoutes} />

            <LayoutContent availableRoutes={availableRoutes}>
              {children}
            </LayoutContent>
          </View>
        </App>
      </body>
    </html>
  );
}
