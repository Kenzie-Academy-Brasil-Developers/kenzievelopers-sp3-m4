import { Request, Response, response } from 'express';
import { QueryConfig, QueryResult } from 'pg';
import { client } from '../../database';

export const getDeveloper = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const id: number = res.locals.id;

  const stringRequestDeveloperById: string = `
    SELECT 
      d.id developerId,
      d.name "developerName",
      d.email "developerEmail",
      di."developerSince" "developerInfoDeveloperSince",
      di."preferredOS" "developerInfoPreferredOS"
    FROM developers d
      LEFT JOIN "developers_infos" di ON (d.id = di."developerId")
    WHERE d.id = $1
  `;

  const queryConfing: QueryConfig = {
    text: stringRequestDeveloperById,
    values: [id],
  };

  const queryResult: QueryResult = await client.query(queryConfing);

  return res.status(200).json(queryResult.rows[0]);
};
