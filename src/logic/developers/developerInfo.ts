import { Request, Response } from 'express';
import {
  IDevelopers_info,
  TDevelopers_info,
  TRequestDevelopers_info,
} from '../../interfaces/interfaces';
import format from 'pg-format';
import { QueryResult } from 'pg';
import { client } from '../../database';

export const developerInfo = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const id: number = res.locals.id;
  const bodyRequest: TDevelopers_info = req.body;

  const OptionsOS: string[] = ['Windows', 'Linux', 'MacOS'];

  if (!OptionsOS.includes(bodyRequest.preferredOS))
    return res.status(400).json({
      message: 'Invalid OS option.',
      options: OptionsOS,
    });

  const stringDevelopersInfoVefiryExit: string =
    'SELECT * FROM developers_infos';

  const queryResultRequestDevelopersInfo: QueryResult = await client.query(
    stringDevelopersInfoVefiryExit
  );

  const findIndex = queryResultRequestDevelopersInfo.rows.findIndex(
    (developerInfo: IDevelopers_info) => developerInfo.developerId === id
  );

  if (findIndex !== -1)
    return res.status(409).json({
      message: 'Developer infos already exists.',
    });

  const developerInfoRequest: TRequestDevelopers_info = {
    ...bodyRequest,
    developerId: id,
  };

  const stringRequestDeveloperInfo: string = format(
    `
  INSERT INTO developers_infos 
    (%I)
  VALUES
    (%L)
  RETURNING *;
  `,
    Object.keys(developerInfoRequest),
    Object.values(developerInfoRequest)
  );

  const queryResult: QueryResult = await client.query(
    stringRequestDeveloperInfo
  );

  return res.status(201).json(queryResult.rows[0]);
};
