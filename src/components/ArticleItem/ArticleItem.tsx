import { MenuItem, Text, View } from "reshaped";

type Props = {
  title: string;
  date: string;
};

const ArticleItem = (props: Props) => {
  const { title, date } = props;

  return (
    <MenuItem.Aligner>
      <MenuItem roundedCorners>
        <View gap={0.5}>
          <Text>{title}</Text>
          <Text color="neutral-faded" weight="regular">
            {date}
          </Text>
        </View>
      </MenuItem>
    </MenuItem.Aligner>
  );
};

export default ArticleItem;
