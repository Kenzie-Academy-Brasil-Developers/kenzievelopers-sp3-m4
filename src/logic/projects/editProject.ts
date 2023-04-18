import { Request, Response } from 'express';
import format from 'pg-format';
import { IProjects } from '../../interfaces/interfaces';
import { QueryConfig, QueryResult } from 'pg';
import { client } from '../../database';

export const editProject = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const id: number = Number(req.params.id);
  const bodyRequest: Partial<IProjects> = req.body;

  const stringEditProject: string = format(
    `
      UPDATE projects  
        SET 
          (%I) =
        ROW (%L)
      WHERE id = $1
      RETURNING *;
    `,
    Object.keys(bodyRequest),
    Object.values(bodyRequest)
  );

  const queryConfig: QueryConfig = {
    text: stringEditProject,
    values: [id],
  };

  const queryResult: QueryResult = await client.query(queryConfig);

  return res.status(200).json(queryResult.rows[0]);
};
