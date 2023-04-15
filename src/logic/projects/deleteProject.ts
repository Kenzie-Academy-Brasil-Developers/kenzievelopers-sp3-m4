import { Request, Response } from 'express';
import { QueryConfig, QueryResult } from 'pg';
import { client } from '../../database';

export const deleteProject = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const id: number = res.locals.id;

  const stringDeleteProject = `
    DELETE FROM projects
    WHERE id = $1;
  `;

  const queryConfig: QueryConfig = {
    text: stringDeleteProject,
    values: [id],
  };

  await client.query(queryConfig);

  return res.status(204).send();
};
