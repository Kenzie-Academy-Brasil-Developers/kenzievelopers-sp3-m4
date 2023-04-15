export interface IDevelopers {
  id: number;
  name: string;
  email: string;
}

export type TDevelopers = Omit<IDevelopers, 'id'>;

export interface IDevelopers_info {
  id: number;
  developerSince: Date;
  preferredOS: 'Windows' | 'Linux' | 'MacOS';
  developerId: number;
}

export type TRequestDevelopers_info = Omit<IDevelopers_info, 'id'>;

export type TDevelopers_info = Omit<IDevelopers_info, 'id' | 'developerId'>;

export interface IProjects {
  id: number;
  name: string;
  description: string;
  estimatedTime: string;
  repository: string;
  startDate: Date;
  endDate?: Date | undefined | null;
  developerId: number;
}

export type TProjects = Omit<IProjects, 'id' | 'developerId'>;

export interface ITechnologies {
  id: number;
  name: string;
}

export type TTechnologies = Omit<ITechnologies, 'id'>;

export interface IProjects_technologies {
  id: number;
  addedln: Date;
  technologyId: number;
  projectId: number;
}

export type TProjects_technologies = Omit<
  IProjects_technologies,
  'id' | 'technologyId' | 'projectId'
>;
