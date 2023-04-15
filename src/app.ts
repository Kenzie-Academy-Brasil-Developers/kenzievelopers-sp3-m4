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

app.post('/developers', veriryEmailExist, createDevelper); // Cadastrar um novo desenvolvedor
app.get('/developers/:id', verifyIdDeveloperExist, getDeveloper); // Listar um desenvolvedor e seus projetos
app.patch(
  '/developers/:id',
  veriryEmailExist,
  verifyIdDeveloperExist,
  editDeveloper
); // Atualizar os dados de um desenvolvedor
app.delete('/developers/:id', verifyIdDeveloperExist, deleteDeveloper); // Remover um desenvolvedor
app.post('/developers/:id/infos', verifyIdDeveloperExist, developerInfo); // Cadastrar informações adicionais a um desenvolvedor

app.post('/projects', verifyIdDeveloperExist, createProject); // Cadastrar um novo projeto
app.get('/projects/:id', verifyProjectExist, getProjectById); // Listar um projeto pelo id
app.patch(
  '/projects/:id',
  verifyProjectExist,
  verifyIdDeveloperExist,
  editProject
); // Atualizar um projeto
app.delete('/projects/:id', verifyProjectExist, deleteProject); // Excluir um projeto
app.post(
  '/projects/:id/technologies',
  verifyProjectExist,
  verifyProjectTechnologiesExist,
  addTechnologies
); // Cadastrar uma tecnologia para um projeto
app.delete(
  '/projects/:id/technologies/:name',
  verifyProjectExist,
  verifyProjectTechnologiesExist,
  deletetechnology
); // Deletar uma tecnologia de um projeto

export default app;
