import express from "express";
import {
  getAllItems,
  createNewItem,
  updateItem,
  deleteItem
} from "./controllers/shoppingListItems";
import {
  getAllStores,
  createNewStore,
  updateStore,
  deleteStore
} from "./controllers/shoppingListStores";
import {
  getAllTodos,
  createNewTodo,
  updateTodo,
  deleteTodo
} from "./controllers/todoList";

export const apiRouter = express.Router();

// Items REST API
apiRouter.route("/items").get(getAllItems);
apiRouter.route("/items").post(createNewItem);
apiRouter.route("/items/:id").put(updateItem);
apiRouter.route("/items/:id").delete(deleteItem);

// Stores REST API
apiRouter.route("/stores").get(getAllStores);
apiRouter.route("/stores").post(createNewStore);
apiRouter.route("/stores/:id").put(updateStore);
apiRouter.route("/stores/:id").delete(deleteStore);

// Todos REST API
apiRouter.route("/todos").get(getAllTodos);
apiRouter.route("/todos").post(createNewTodo);
apiRouter.route("/todos/:id").put(updateTodo);
apiRouter.route("/todos/:id").delete(deleteTodo);
