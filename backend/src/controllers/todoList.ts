import express from "express";
import { db } from "../db";

export async function getAllTodos(req: express.Request, res: express.Response) {
  const { rows } = await db.query("SELECT * FROM todos");
  res.status(200).json(rows);
}

export async function createNewTodo(
  req: express.Request,
  res: express.Response
) {
  const body = req.body;
  const response = await db.query(
    "INSERT INTO todos (name) VALUES ($1) RETURNING *;",
    [body.name]
  );
  res.status(201).json(response.rows[0]);
}

export async function updateTodo(req: express.Request, res: express.Response) {
  const body = req.body;
  const id = req.params.id;
  const response = await db.query(
    "UPDATE todos SET name = $1 WHERE id = $2 RETURNING *;",
    [body.name, id]
  );
  res.status(200).json(response.rows[0]);
}

export async function deleteTodo(req: express.Request, res: express.Response) {
  const id = req.params.id;
  const response = await db.query(
    "DELETE FROM todos WHERE id = $1 RETURNING *;",
    [id]
  );
  res.status(200).json(response.rows[0]);
}
