import { Radio } from "react-feather";
import { View, Text, Button } from "reshaped";
import ArticleItem from "@/components/ArticleItem";

const Submenu = () => {
  return (
    <View
      width="384px"
      height="100%"
      padding={6}
      paddingBlock={3}
      gap={6}
      overflow="auto"
    >
      <View gap={4} direction="row" justify="space-between" align="center">
        <Text variant="body-3" weight="bold">
          Writing
        </Text>
        <Button.Aligner>
          <Button icon={Radio} variant="faded" size="small">
            Subscribe
          </Button>
        </Button.Aligner>
      </View>

      <View gap={1}>
        <ArticleItem
          title="Framer Sites first impression"
          date="February 19, 2022"
        />
        <ArticleItem
          title="Design Critique for fun and profit"
          date="February 5, 2022"
        />
      </View>
    </View>
  );
};

export default Submenu;
