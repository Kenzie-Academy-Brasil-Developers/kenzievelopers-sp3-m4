import { Request, Response } from 'express';
import { QueryResult } from 'pg';
import format from 'pg-format';
import { client } from '../../database';

export const createProject = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const bodyRequest = req.body;

  const stringProjectRequest = format(
    `
    INSERT INTO projects
      (%I)
    VALUES
      (%L)
    RETURNING *;
  `,
    Object.keys(bodyRequest),
    Object.values(bodyRequest)
  );

  const queryResult: QueryResult = await client.query(stringProjectRequest);

  return res.status(201).json(queryResult.rows[0]);
};
