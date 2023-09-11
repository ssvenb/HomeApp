import { View, Text, StyleSheet, Pressable } from 'react-native';
import { storeTypeDisp, itemTypeDisp, storeTypeData } from '../../utils/types';
import { IconButton, StandardButton } from '../StandardButtons';
import { primaryColors } from '../../assets/colors';
import { useState, Dispatch, SetStateAction } from 'react';
import { StandardInput } from '../StandardInput';
import { DownUpIcon } from '../../assets/icons';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

type storeProps = {
  store: storeTypeDisp;
  items: itemTypeDisp[];
  selected: boolean;
  setSelected: Dispatch<SetStateAction<number>>;
  updateStore: (store: storeTypeData) => Promise<void>;
  setItems: Dispatch<SetStateAction<itemTypeDisp[]>>;
};

export function Store(props: storeProps) {
  const [storeName, setStoreName] = useState(props.store.name);
  const [editMode, setEditMode] = useState(props.store.editMode);

  async function updateStore() {
    await props.updateStore({
      id: props.store.id,
      name: storeName
    });
    setEditMode(false);
  }

  return (
    <View style={styles.storeContainer}>
      {editMode ? (
        <View style={styles.rowCenter}>
          <View style={[styles.storeHeader, styles.rowCenter]}>
            <DownUpIcon
              direction={props.selected ? 'down' : 'up'}
              color={primaryColors.text}
            />
            <StandardInput
              placeholder=""
              value={storeName}
              onChange={(text) => setStoreName(text)}
              onEnter={updateStore}
              style={styles.storeName}
            />
          </View>
          <View style={styles.editButton}>
            <IconButton
              icon="back"
              colorIcon={primaryColors.text}
              onPress={() => setEditMode(false)}
            />
          </View>
        </View>
      ) : (
        <View style={styles.rowCenter}>
          <StandardButton
            onPress={() => {
              props.setSelected(props.selected ? NaN : props.store.id!);
            }}
            style={{ ...styles.storeHeader, ...styles.rowCenter }}
          >
            <DownUpIcon
              direction={props.selected ? 'down' : 'up'}
              color={primaryColors.text}
            />
            <Text style={styles.storeName}>{props.store.name}</Text>
          </StandardButton>
          {props.selected && (
            <View style={styles.editButton}>
              <IconButton
                icon="edit"
                colorIcon={primaryColors.text}
                onPress={() => setEditMode(true)}
              />
            </View>
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  storeContainer: {
    width: '100%'
  },
  storeHeader: {
    justifyContent: 'flex-start',
    width: '100%',
    height: 60,
    borderRadius: 30,
    backgroundColor: primaryColors.mainColor,
    paddingHorizontal: 10,
    marginVertical: 5
  },
  storeName: {
    fontSize: 30,
    color: primaryColors.text,
    marginLeft: 10
  },
  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  editButton: {
    position: 'absolute',
    right: 20
  }
});
