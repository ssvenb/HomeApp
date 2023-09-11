import { storeTypeData, itemTypeData, todoTypeData } from './types';
import { SERVER_URL } from '../../App';

async function getRequest(url: string): Promise<[]> {
  const response = await fetch(url);
  const responseData = await response.json();
  return responseData;
}

async function createRequest(url: string, data: Object) {
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  const responseData = await response.json();
  return responseData;
}

async function updateRequest(url: string, data: Object) {
  const response = await fetch(url, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  const responseData = await response.json();
  return responseData;
}

async function deleteRequest(url: string) {
  const response = await fetch(url, { method: 'DELETE' });
  const responseData = await response.json();
  return responseData;
}

// GET Requests
export async function fetchStores(): Promise<storeTypeData[]> {
  const response = await getRequest(`${SERVER_URL}api/stores`);
  return response;
}

export async function fetchItems(): Promise<itemTypeData[]> {
  return await getRequest(`${SERVER_URL}api/items`);
}

export async function fetchTodos(): Promise<todoTypeData[]> {
  return await getRequest(`${SERVER_URL}api/todos`);
}

// POST Requests
export async function createStore(data: storeTypeData): Promise<storeTypeData> {
  return await createRequest(`${SERVER_URL}api/stores`, data);
}

export async function createItem(data: itemTypeData): Promise<itemTypeData> {
  return await createRequest(`${SERVER_URL}api/items`, data);
}

export async function createTodo(data: todoTypeData): Promise<todoTypeData> {
  return await createRequest(`${SERVER_URL}api/todos`, data);
}

// PUT Requests
export async function updateStore(data: storeTypeData): Promise<storeTypeData> {
  return await updateRequest(`${SERVER_URL}api/stores/${data.id}`, data);
}

export async function updateItem(data: itemTypeData): Promise<itemTypeData> {
  return await updateRequest(`${SERVER_URL}api/items/${data.id}`, data);
}

export async function updateTodo(data: todoTypeData): Promise<todoTypeData> {
  return await updateRequest(`${SERVER_URL}api/todos/${data.id}`, data);
}

// DELETE Requests
export async function deleteStore(id: number) {
  await deleteRequest(`${SERVER_URL}api/stores/${id}`);
}

export async function deleteItem(id: number) {
  await deleteRequest(`${SERVER_URL}api/items/${id}`);
}

export async function deleteTodo(id: number) {
  await deleteRequest(`${SERVER_URL}api/todos/${id}`);
}
