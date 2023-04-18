import { Request, Response } from 'express';
import { QueryConfig, QueryResult } from 'pg';
import format from 'pg-format';
import { client } from '../../database';
import { TDevelopers } from '../../interfaces/interfaces';

export const editDeveloper = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const id: number = res.locals.id;
  const requestBody: Partial<TDevelopers> = req.body;

  const stringUpdateDeveloper: string = format(
    `
      UPDATE developers 
        SET 
          (%I) =
         ROW (%L)
      WHERE id = $1
      RETURNING *;
  `,
    Object.keys(requestBody),
    Object.values(requestBody)
  );

  const queryConfig: QueryConfig = {
    text: stringUpdateDeveloper,
    values: [id],
  };

  const queryResult: QueryResult = await client.query(queryConfig);

  return res.status(200).json(queryResult.rows[0]);
};
