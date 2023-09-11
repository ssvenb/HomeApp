import { StyleSheet, Text, View } from 'react-native';
import { itemTypeData, itemTypeDisp } from '../../utils/types';
import { useState } from 'react';
import { StandardInput } from '../StandardInput';
import { IconButton } from '../StandardButtons';
import { primaryColors } from '../../assets/colors';
import Animated, {
  FadeInUp,
  FadeOutUp,
  SharedValue,
  useAnimatedStyle
} from 'react-native-reanimated';

type itemProps = {
  item: itemTypeDisp;
  colorItems: SharedValue<{ [key: string]: number }>;
  updateItem: (item: itemTypeData) => Promise<void>;
  deleteItem: (id: number) => Promise<void>;
};

export function Item(props: itemProps) {
  const [itemName, setItemName] = useState(props.item.name);
  const [editMode, setEditMode] = useState(props.item.editMode);

  const animatedStyles = useAnimatedStyle(() => {
    const offset = props.colorItems.value[props.item.id!.toString()];
    const value = Math.max(255 - Math.round(Math.abs(offset!) / 2), 0);
    const color = value > 9 ? value.toString(16) : '0' + value.toString(16);
    return {
      backgroundColor:
        Math.abs(offset!) > 40
          ? `#ff${color}${color}`
          : primaryColors.background
    };
  });

  return (
    <Animated.View
      style={[styles.outerContainer, animatedStyles]}
      entering={FadeInUp}
      exiting={FadeOutUp}
    >
      {editMode ? (
        <View style={styles.innerContainer}>
          <StandardInput
            placeholder=""
            value={itemName}
            onChange={(text) => setItemName(text)}
            style={styles.text}
            onEnter={async () => {
              await props.updateItem({
                id: props.item.id,
                name: itemName,
                store: props.item.store
              });
              setEditMode(false);
            }}
          />
          <View style={{ flexDirection: 'row' }}>
            <IconButton
              icon="back"
              colorIcon={primaryColors.text}
              onPress={() => setEditMode(false)}
              styleButton={{ width: 30, height: 30 }}
            />
          </View>
        </View>
      ) : (
        <View style={styles.innerContainer}>
          <Text style={styles.text}>{itemName}</Text>
          <IconButton
            icon="edit"
            colorIcon={primaryColors.text}
            onPress={() => setEditMode(true)}
          />
        </View>
      )}
    </Animated.View>
  );
}

export function EmptyStore() {
  return (
    <Text style={{ padding: 5, textAlign: 'center' }}>Leere Einkaufsliste</Text>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    alignItems: 'center',
    width: '100%',
    marginTop: 10,
    borderRadius: 20
  },
  innerContainer: {
    width: '80%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    borderRadius: 10
  },
  text: {
    marginLeft: 0,
    fontSize: 30
  }
});
