import express from "express";
import { db } from "../db";

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
