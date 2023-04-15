import { Request, Response } from 'express';
import { Query, QueryResult } from 'pg';
import { client } from '../../database';
import { IDevelopers, TDevelopers } from '../../interfaces/interfaces';
import format from 'pg-format';

export const createDevelper = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const requestData: TDevelopers = res.locals.body;

  const stringCreateDeveloper = format(
    `
      INSERT INTO developers 
        (%I)
      VALUES
        (%L)
      RETURNING *
  `,
    Object.keys(requestData),
    Object.values(requestData)
  );

  const queryResult: QueryResult = await client.query(stringCreateDeveloper);

  return res.status(201).json(queryResult.rows[0]);
};
