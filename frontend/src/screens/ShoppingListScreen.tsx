import {
  ListRenderItemInfo,
  SafeAreaView,
  StyleSheet,
  View
} from 'react-native';
import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import { Store } from '../components/shoppingList/ShoppingListStore';
import { EmptyStore, Item } from '../components/shoppingList/ShoppingListItem';
import { ListEmpty } from '../components/shoppingList/StoresEmpty';
import {
  storeTypeDisp,
  storeTypeData,
  itemTypeDisp,
  itemTypeData
} from '../utils/types';
import { IconButton } from '../components/StandardButtons';
import { primaryColors } from '../assets/colors';
import {
  fetchStores,
  fetchItems,
  createStore,
  updateStore,
  deleteStore,
  createItem,
  updateItem,
  deleteItem
} from '../utils/serverInteraction';
import { SwipeListView } from 'react-native-swipe-list-view';
import { useSharedValue } from 'react-native-reanimated';

interface shoppingListScreenProps {
  setConnected: Dispatch<SetStateAction<boolean>>;
}

export function ShoppingListScreen(props: shoppingListScreenProps) {
  const [stores, setStores] = useState<storeTypeDisp[]>([]);
  const [items, setItems] = useState<itemTypeDisp[]>([]);
  const [selected, setSelected] = useState(NaN);
  const [refreshing, setRefreshing] = useState(false);

  const colorItems = useSharedValue<{}>({});

  async function createStoreDisp() {
    const newStore = await createStore({ name: '' });
    setStores([{ ...newStore, editMode: true }, ...stores]);
    setSelected(newStore.id!);
  }

  async function updateStoreDisp(store: storeTypeData) {
    const response = await updateStore(store);
    const updatedStores = stores.map((storeF) => {
      if (storeF.id === store.id) {
        return { ...store, editMode: false };
      }
      return storeF;
    });
    setStores(updatedStores);
  }

  async function deleteStoreDisp(id: number) {
    const response = await deleteStore(id);
    setStores(stores.filter((store) => id !== store.id));
    setSelected(NaN);
  }

  async function createItemDisp() {
    const newItem = await createItem({ name: '', store: selected });
    setItems([{ ...newItem, editMode: true }, ...items]);
  }

  async function updateItemDisp(item: itemTypeData) {
    const response = await updateItem(item);
    const updatedItems = items.map((itemMap) => {
      if (itemMap.id === item.id) {
        return { ...item, editMode: false, done: false };
      }
      return itemMap;
    });
    setItems(updatedItems);
  }

  async function deleteItemDisp(id: number) {
    const response = await deleteItem(id);
    setItems(items.filter((item) => id != item.id));
  }

  async function fetchShoppingList() {
    setRefreshing(true);
    const fetchedStores = await fetchStores();
    const initialStores: storeTypeDisp[] = [];
    fetchedStores.forEach((store) => {
      initialStores.unshift({ ...store, editMode: false });
    });
    setStores(initialStores);
    const fetchedItems = await fetchItems();
    const initialItems: itemTypeDisp[] = [];
    fetchedItems.forEach((item) => {
      initialItems.unshift({ ...item, editMode: false });
    });
    setItems(initialItems);
    setRefreshing(false);
  }

  useEffect(() => {
    async function init() {
      const response = await fetchShoppingList();
      console.log(response);
    }
    init()
      .then(() => props.setConnected(true))
      .catch(() => props.setConnected(false));
  }, []);

  function renderItem(data: ListRenderItemInfo<itemTypeDisp>) {
    colorItems.value = { ...colorItems.value, [data.item.id!]: 0 };
    return (
      <Item
        item={data.item}
        colorItems={colorItems}
        updateItem={updateItemDisp}
        deleteItem={deleteItemDisp}
      />
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <IconButton
        icon="add"
        colorIcon={primaryColors.text}
        sizeIcon={100}
        styleIcon={{ width: 100, height: 100 }}
        styleButton={{
          backgroundColor: primaryColors.button,
          borderRadius: 50,
          position: 'absolute',
          bottom: 25,
          right: 25,
          zIndex: 1,
          width: 100,
          height: 100
        }}
        onPress={async () => {
          selected ? await createItemDisp() : await createStoreDisp();
        }}
      />
      <SwipeListView
        data={stores.filter((store) => !selected || store.id === selected)}
        disableLeftSwipe={!Number.isNaN(selected)}
        disableRightSwipe={!Number.isNaN(selected)}
        leftOpenValue={60}
        rightOpenValue={-60}
        renderItem={(data) => (
          <Store
            store={data.item}
            items={items}
            selected={selected === data.item.id!}
            setSelected={setSelected}
            updateStore={updateStoreDisp}
            setItems={setItems}
          />
        )}
        renderHiddenItem={(data) => (
          <View
            style={{
              flexDirection: 'row',
              height: '100%',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <IconButton
              icon="delete"
              colorIcon={primaryColors.delete}
              onPress={async () => await deleteStoreDisp(data.item.id!)}
            />
            <IconButton
              icon="delete"
              colorIcon={primaryColors.delete}
              onPress={async () => await deleteStoreDisp(data.item.id!)}
            />
          </View>
        )}
        keyExtractor={(item) => item.id!.toString()}
        ListEmptyComponent={<ListEmpty />}
        style={styles.list}
        refreshing={refreshing}
        onRefresh={fetchShoppingList}
      />
      {!Number.isNaN(selected) && (
        <SwipeListView
          data={items.filter((item) => item.store == selected)}
          renderItem={renderItem}
          renderHiddenItem={() => <></>}
          keyExtractor={(item) => item.id!.toString()}
          ListEmptyComponent={<EmptyStore />}
          style={[styles.list, { height: '100%' }]}
          rightActivationValue={-200}
          rightActionValue={-400}
          onRightAction={async (id) => {
            await deleteItemDisp(Number(id));
          }}
          leftActivationValue={200}
          leftActionValue={400}
          onLeftAction={async (id) => {
            await deleteItemDisp(Number(id));
          }}
          onSwipeValueChange={(data) => {
            colorItems.value = { ...colorItems.value, [data.key]: data.value };
          }}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: primaryColors.background,
    alignItems: 'center',
    height: '100%',
    width: '100%',
    padding: 10
  },
  list: {
    width: '100%',
    minHeight: 70
  }
});
