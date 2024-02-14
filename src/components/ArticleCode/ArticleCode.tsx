import { codeToHtml } from "shiki";
import { View } from "reshaped";
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
    <View borderRadius="medium" backgroundColor="neutral-faded" overflow="auto">
      <div dangerouslySetInnerHTML={{ __html: html }} className={s.root} />
    </View>
  );
};

export default ArticleCode;
