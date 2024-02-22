import { codeToHtml } from "shiki";
import { View, Theme } from "reshaped";
import s from "./ArticleCode.module.css";

type Props = {
  code: string;
  language: string;
};

const ArticleCode = async (props: Props) => {
  const { code } = props;
  const html = await codeToHtml(code, {
    lang: "tsx",
    theme: "poimandres",
  });

  return (
    <Theme colorMode="dark">
      <View
        borderRadius="medium"
        backgroundColor="neutral-faded"
        overflow="auto"
      >
        <div dangerouslySetInnerHTML={{ __html: html }} className={s.root} />
      </View>
    </Theme>
  );
};

export default ArticleCode;
