import { NextFunction, Request, Response } from 'express';
import { QueryConfig, QueryResult } from 'pg';
import { client } from './database';
import {
  IDevelopers,
  IProjects,
  IProjects_technologies,
  ITechnologies,
  TDevelopers,
} from './interfaces/interfaces';

export const veriryEmailExist = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const requestData: TDevelopers = req.body;

  const stringDeveloper: string = 'SELECT * FROM developers';

  const queryResultDevelopers: QueryResult = await client.query(
    stringDeveloper
  );

  const verifyEmailExist = queryResultDevelopers.rows.findIndex(
    (developer: IDevelopers) => developer.email === requestData.email
  );

  if (verifyEmailExist !== -1)
    return res.status(409).json({
      message: 'Email already exists.',
    });

  res.locals.body = requestData;

  next();
};

export const verifyIdDeveloperExist = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  let idRequest: Number = Number(req.params.id);

  if (req.route.path === '/projects' || req.route.path === '/projects/:id')
    idRequest = req.body.developerId;

  const stringDevelopers: string = 'SELECT * FROM developers';

  const queryResult: QueryResult = await client.query(stringDevelopers);

  const findIndex = queryResult.rows.findIndex(
    (developer: IDevelopers) => developer.id === idRequest
  );

  if (findIndex === -1)
    return res.status(404).json({
      message: 'Developer not found.',
    });

  res.locals.id = idRequest;

  next();
};

export const verifyProjectExist = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const idRequest: number = Number(req.params.id);

  const stringDeveloper: string = 'SELECT * FROM projects';

  const queryResult: QueryResult = await client.query(stringDeveloper);

  const findIndex = queryResult.rows.findIndex(
    (developer: IProjects) => developer.id === idRequest
  );

  if (findIndex === -1)
    return res.status(404).json({
      message: 'Project not found.',
    });

  res.locals.id = idRequest;

  next();
};

export const verifyProjectTechnologiesExist = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const id = res.locals.id;
  let technologyName: string = req.body.name;

  if (req.route.path === '/projects/:id/technologies/:name')
    technologyName = req.params.name;

  const stringTechnologyName: string = `
    SELECT * FROM technologies
    WHERE name = $1; 
  `;

  const queryConfig: QueryConfig = {
    text: stringTechnologyName,
    values: [technologyName],
  };

  const queryResult: QueryResult = await client.query(queryConfig);

  if (queryResult.rowCount === 0)
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

  const stringProjectTechhnologies: string =
    'SELECT * FROM projects_technologies;';

  const queryResultProjectTechnologies = await client.query(
    stringProjectTechhnologies
  );

  const projectTechnology: IProjects_technologies =
    queryResultProjectTechnologies.rows.find(
      (projectTechnology: IProjects_technologies) =>
        projectTechnology.projectId === id
    );

  if (
    projectTechnology !== undefined &&
    req.route.path === '/projects/:id/technologies'
  )
    return res.status(409).json({
      message: 'This technology is already associated with the project',
    });

  if (
    projectTechnology === undefined &&
    req.route.path === '/projects/:id/technologies/:name'
  )
    return res.status(400).json({
      message: 'Technology not related to the project.',
    });

  next();
};
