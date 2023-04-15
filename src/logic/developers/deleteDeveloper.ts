import { Request, Response, query } from 'express';
import { QueryConfig } from 'pg';
import { client } from '../../database';

export const deleteDeveloper = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const id: number = res.locals.id;

  const stringDeleteDevelolper: string = `
    DELETE FROM developers 
    WHERE id = $1;
  `;

  const queryConfig: QueryConfig = {
    text: stringDeleteDevelolper,
    values: [id],
  };

  await client.query(queryConfig);

  return res.status(204).send();
};
