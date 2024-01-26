import { View, Button, Text, MenuItem } from "reshaped";

const Menu = () => {
  return (
    <View
      backgroundColor="elevation-base"
      divided
      direction="row"
      align="stretch"
    >
      <View width="224px" divided height="100%">
        <View padding={3} paddingBlock={2} grow>
          <Text variant="body-2" weight="bold">
            Reshaped
          </Text>
          <MenuItem href="#" color="primary" selected>
            Hello
          </MenuItem>
        </View>
        <View padding={2}>
          <Button fullWidth>Sign in</Button>
        </View>
      </View>
      <View width="384px" height="100%">
        Hello
      </View>
    </View>
  );
};

export default Menu;
