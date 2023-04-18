import { Request, Response } from 'express';
import { QueryConfig, QueryResult } from 'pg';
import { client } from '../../database';

export const getProjectById = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const id: number = res.locals.id;

  const stringProject: string = `
    SELECT 
      p."id" "projectId",
      p."name" "projectName",
      p."description" "projectDescription",
      p."estimatedTime" "projectEstimatedTime",
      p."repository" "projectRepository",
      p."startDate" "projectStartDate",
      p."endDate" "projectEndDate",
      p."developerId" "projectDeveloperId",
      pt."technologyId",
      t."name" "technologyName"
    FROM projects p
      LEFT JOIN "projects_technologies" pt ON (p.id = pt."projectId")
        LEFT JOIN technologies t ON (pt."technologyId" = t.id)
    WHERE p.id = $1;
  `;

  const queryConfig: QueryConfig = {
    text: stringProject,
    values: [id],
  };

  const queryResult: QueryResult = await client.query(queryConfig);

  return res.status(200).json(queryResult.rows);
};
