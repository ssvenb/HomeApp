import express from "express";
import { db } from "./db";

export async function getAllItems(req: express.Request, res: express.Response) {
  const { rows } = await db.query("SELECT * FROM items");
  res.status(200).json(rows);
}

export async function createNewItem(
  req: express.Request,
  res: express.Response
) {
  const body = req.body;
  const response = await db.query(
    "INSERT INTO items (name, store) VALUES ($1, $2) RETURNING *;",
    [body.name, body.store]
  );
  res.status(201).json(response.rows[0]);
}

export async function updateItem(req: express.Request, res: express.Response) {
  const body = req.body;
  const id = req.params.id;
  const response = await db.query(
    "UPDATE items SET name = $1, store = $2 WHERE id = $3 RETURNING *;",
    [body.name, body.store, id]
  );
  res.status(200).json(response.rows[0]);
}

export async function deleteItem(req: express.Request, res: express.Response) {
  const id = req.params.id;
  const response = await db.query(
    "DELETE FROM items WHERE id = $1 RETURNING *;",
    [id]
  );
  res.status(200).json(response.rows[0]);
}

export async function getAllStores(
  req: express.Request,
  res: express.Response
) {
  const { rows } = await db.query("SELECT * FROM stores");
  res.status(200).json(rows);
}

export async function createNewStore(
  req: express.Request,
  res: express.Response
) {
  const body = req.body;
  const response = await db.query(
    "INSERT INTO stores (name) VALUES ($1) RETURNING *;",
    [body.name]
  );
  res.status(201).json(response.rows[0]);
}

export async function updateStore(req: express.Request, res: express.Response) {
  const body = req.body;
  const id = req.params.id;
  const response = await db.query(
    "UPDATE stores SET name = $1 WHERE id = $2 RETURNING *;",
    [body.name, id]
  );
  res.status(200).json(response.rows[0]);
}

export async function deleteStore(req: express.Request, res: express.Response) {
  const id = req.params.id;
  const response = await db.query(
    "DELETE FROM stores WHERE id = $1 RETURNING *;",
    [id]
  );
  await db.query("DELETE FROM items WHERE store = $1 RETURNING *;", [id]);
  res.status(200).json(response.rows[0]);
}
