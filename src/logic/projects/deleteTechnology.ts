import { Request, Response } from 'express';
import { QueryConfig, QueryResult } from 'pg';
import { client } from '../../database';

export const deletetechnology = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const technologyName: string = req.params.name;
  const projectId: number = res.locals.id;

  const stringSelectTechnologyName = `
    SELECT * FROM 
      technologies
    WHERE name = $1;
  `;

  const queryConfigTechnology: QueryConfig = {
    text: stringSelectTechnologyName,
    values: [technologyName],
  };

  const queryResultTechnology: QueryResult = await client.query(
    queryConfigTechnology
  );

  if (queryResultTechnology.rowCount === 0)
    return res.status(404).json({
      message: 'Technology not related to the project.',
    });

  const stringDeleteTechnology: string = `
    DELETE FROM projects_technologies
    WHERE "technologyId" = $1 AND "projectId" = $2; 
  `;

  const queryConfig: QueryConfig = {
    text: stringDeleteTechnology,
    values: [queryResultTechnology.rows[0].id, projectId],
  };

  await client.query(queryConfig);

  return res.status(204).send();
};
