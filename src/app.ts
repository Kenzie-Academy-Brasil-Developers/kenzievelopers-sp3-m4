import express, { Application } from 'express';
import 'dotenv/config';
import { createDevelper } from './logic/developers/createDeveloper';
import { deleteDeveloper } from './logic/developers/deleteDeveloper';
import { developerInfo } from './logic/developers/developerInfo';
import { editDeveloper } from './logic/developers/editDeveloper';
import { getDeveloper } from './logic/developers/getDeveloperById';
import { createProject } from './logic/projects/createProject';
import { getProjectById } from './logic/projects/getProjectById';
import { editProject } from './logic/projects/editProject';
import { deleteProject } from './logic/projects/deleteProject';
import { addTechnologies } from './logic/projects/addTechnologies';
import { deletetechnology } from './logic/projects/deleteTechnology';
import {
  verifyIdDeveloperExist,
  verifyProjectExist,
  verifyProjectTechnologiesExist,
  veriryEmailExist,
} from './middwires';

const app: Application = express();

app.use(express.json());

app.post('/developers', veriryEmailExist, createDevelper);
app.get('/developers/:id', verifyIdDeveloperExist, getDeveloper);
app.patch(
  '/developers/:id',
  verifyIdDeveloperExist,
  veriryEmailExist,
  editDeveloper
);
app.delete('/developers/:id', verifyIdDeveloperExist, deleteDeveloper);
app.post('/developers/:id/infos', verifyIdDeveloperExist, developerInfo);

app.post('/projects', verifyIdDeveloperExist, createProject);
app.get('/projects/:id', verifyProjectExist, getProjectById);
app.patch(
  '/projects/:id',
  verifyProjectExist,
  verifyIdDeveloperExist,
  editProject
);
app.delete('/projects/:id', verifyProjectExist, deleteProject);
app.post(
  '/projects/:id/technologies',
  verifyProjectExist,
  verifyProjectTechnologiesExist,
  addTechnologies
);
app.delete(
  '/projects/:id/technologies/:name',
  verifyProjectExist,
  verifyProjectTechnologiesExist,
  deletetechnology
);

export default app;
