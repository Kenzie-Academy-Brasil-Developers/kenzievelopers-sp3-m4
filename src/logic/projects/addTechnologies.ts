import { Request, Response } from 'express';
import {
  IProjects_technologies,
  ITechnologies,
  TTechnologies,
} from '../../interfaces/interfaces';
import { client } from '../../database';
import { QueryConfig, QueryResult } from 'pg';

export const addTechnologies = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const bodyRequest: TTechnologies = req.body;
  const id = res.locals.id;

  const stringTechnologies: string = 'SELECT * FROM technologies';

  const queryResultTechnologies: QueryResult = await client.query(
    stringTechnologies
  );

  const technology: ITechnologies = queryResultTechnologies.rows.find(
    (technologyResponse: ITechnologies) =>
      technologyResponse.name === bodyRequest.name
  );

  if (technology === undefined)
    return res.status(400).json({
      message: 'Technology not supported.',
      options: [
        'JavaScript',
        'Python',
        'React',
        'Express.js',
        'HTML',
        'CSS',
        'Django',
        'PostgreSQL',
        'MongoDB',
      ],
    });

  const stringAddTechnoligy = `
      INSERT INTO projects_technologies
        ("addedln", "technologyId", "projectId")
      VALUES
        ('2022-09-22', $1, $2)
      RETURNING *;
    `;

  const queryConfig: QueryConfig = {
    text: stringAddTechnoligy,
    values: [technology.id, id],
  };

  await client.query(queryConfig);

  const stringSelectResponse: string = `
    SELECT 
      p."id" "projectId",
      p."name" "projectName",
      p."description" "projectDescription",
      p."estimatedTime" "projectEstimatedTime",
      p."repository" "projectRepository",
      p."startDate" "projectStartDate",
      p."endDate" "projectEndDate",
      pt."technologyId",
      t."name" "technologyName"
    FROM projects p
      LEFT JOIN "projects_technologies" pt ON (p.id = pt."projectId")
        LEFT JOIN technologies t ON (pt."technologyId" = t.id)
    WHERE p.id = $1;
  `;

  const queryConfigResponse: QueryConfig = {
    text: stringSelectResponse,
    values: [id],
  };

  const queryResult: QueryResult = await client.query(queryConfigResponse);

  return res.status(201).json(queryResult.rows[0]);
};
