import {
  Text,
  SafeAreaView,
  ListRenderItemInfo,
  StyleSheet
} from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';
import {
  fetchTodos,
  createTodo,
  updateTodo,
  deleteTodo
} from '../utils/serverInteraction';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { todoTypeData, todoTypeDisp } from '../utils/types';
import { useSharedValue } from 'react-native-reanimated';
import { Item, EmptyTodo } from '../components/todoList/TodoListItem';
import { IconButton } from '../components/StandardButtons';
import { primaryColors } from '../assets/colors';

interface todoListProps {
  setConnected: Dispatch<SetStateAction<boolean>>;
}

export function TodoListScreen(props: todoListProps) {
  const [todos, setTodos] = useState<todoTypeDisp[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const colorItems = useSharedValue<{}>({});

  async function createTodoDisp() {
    const newTodo = await createTodo({ name: '' });
    setTodos([{ ...newTodo, editMode: true }, ...todos]);
  }

  async function updateTodoDisp(todo: todoTypeData) {
    const response = await updateTodo(todo);
    const updatedTodos = todos.map((todoMap) => {
      if (todoMap.id === todo.id) {
        return { ...todo, editMode: false, done: false };
      }
      return todoMap;
    });
    setTodos(updatedTodos);
  }

  async function deleteTodoDisp(id: number) {
    const response = await deleteTodo(id);
    setTodos(todos.filter((todo) => id != todo.id));
  }

  async function fetchTodoList() {
    setRefreshing(true);
    const fetchedTodos = await fetchTodos();
    const initialTodos: todoTypeDisp[] = [];
    fetchedTodos.forEach((todo) => {
      initialTodos.unshift({ ...todo, editMode: false });
    });
    setTodos(initialTodos);
    setRefreshing(false);
  }

  useEffect(() => {
    async function init() {
      const response = await fetchTodoList();
    }
    init()
      .then(() => props.setConnected(true))
      .catch(() => props.setConnected(false));
  }, []);

  function renderItem(data: ListRenderItemInfo<todoTypeDisp>) {
    colorItems.value = { ...colorItems.value, [data.item.id!]: 0 };
    return (
      <Item
        item={data.item}
        colorItems={colorItems}
        updateItem={updateTodoDisp}
        deleteItem={deleteTodoDisp}
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
        onPress={createTodoDisp}
      />
      <SwipeListView
        data={todos}
        renderItem={renderItem}
        renderHiddenItem={() => <></>}
        keyExtractor={(item) => item.id!.toString()}
        ListEmptyComponent={<EmptyTodo />}
        style={[styles.list, { height: '100%' }]}
        rightActivationValue={-200}
        rightActionValue={-400}
        onRightAction={async (id) => {
          await deleteTodoDisp(Number(id));
        }}
        leftActivationValue={200}
        leftActionValue={400}
        onLeftAction={async (id) => {
          await deleteTodoDisp(Number(id));
        }}
        onSwipeValueChange={(data) => {
          colorItems.value = { ...colorItems.value, [data.key]: data.value };
        }}
      />
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
