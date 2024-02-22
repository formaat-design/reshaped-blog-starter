import React from "react";
import NextLink from "next/link";
import { MDXRemoteProps, compileMDX } from "next-mdx-remote/rsc";
import type { MDXComponents } from "mdx/types";
import { View, Text, Link, Divider, Image } from "reshaped";
import ArticleHeading from "../../components/ArticleHeading";
import ArticleCode from "../../components/ArticleCode";
import ArticleBio from "../../components/ArticleBio";
import Article from "../../components/Article";
import s from "./MdxContent.module.css";

const components: MDXComponents = {
  Bio: ArticleBio,
  strong: ({ children }) => {
    return (
      <Text as="b" color="neutral">
        {children}
      </Text>
    );
  },
  ul: ({ children }) => {
    return <ul className={s.ul}>{children}</ul>;
  },
  ol: ({ children }) => {
    return <ul className={s.ul}>{children}</ul>;
  },
  li: ({ children }) => {
    return (
      <Text color="neutral-faded" variant="body-2" as="li" className={s.li}>
        {children}
      </Text>
    );
  },
  h1: ({ children }) => <ArticleHeading level={1}>{children}</ArticleHeading>,
  h2: ({ children }) => <ArticleHeading level={2}>{children}</ArticleHeading>,
  h3: ({ children }) => <ArticleHeading level={3}>{children}</ArticleHeading>,
  h4: ({ children }) => <ArticleHeading level={4}>{children}</ArticleHeading>,
  h5: ({ children }) => <ArticleHeading level={5}>{children}</ArticleHeading>,
  h6: ({ children }) => <ArticleHeading level={6}>{children}</ArticleHeading>,
  hr: () => <Divider />,
  p: ({ children }) => {
    return (
      <Text color="neutral-faded" variant="body-2">
        {children}
      </Text>
    );
  },
  a: ({ children, href }) => {
    if (!href) return null;

    return (
      <NextLink href={href} legacyBehavior passHref>
        <Link variant="plain">{children}</Link>
      </NextLink>
    );
  },
  img: ({ src, alt }) => {
    return <Image src={src} alt={alt || ""} borderRadius="medium" />;
  },
  pre: ({ children }) => {
    if (!React.isValidElement(children)) return null;
    const { children: code, className } = children.props;
    const language = className.replace("langugage-", "");

    return (
      <div>
        <ArticleCode code={code} language={language} />
      </div>
    );
  },
};

const CustomMDX = async (props: MDXRemoteProps & { parentUrl?: string }) => {
  const { source, parentUrl } = props;
  const { frontmatter, content } = await compileMDX<{
    title: string;
    created: Date;
  }>({
    source,
    options: { parseFrontmatter: true },
    components,
  });

  return (
    <Article
      title={frontmatter.title}
      created={frontmatter.created}
      parentUrl={parentUrl}
    >
      {content}
    </Article>
  );
};

export default CustomMDX;
