CREATE TABLE developers (
  "id" SERIAL PRIMARY KEY,
  "name" VARCHAR(50) NOT NULL,
  "email" VARCHAR(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS developers_infos (
  "id" SERIAL PRIMARY KEY,
  "developerSince" DATE NOT NULL,
  "preferredOS" TEXT NOT NULL,
  "developerId" INTEGER UNIQUE NOT NULL,
  CHECK ("preferredOS" = 'Windows' OR "preferredOS" = 'Linux' OR "preferredOS" = 'MacOS'),
  FOREIGN KEY ("developerId") REFERENCES developers(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS projects (
 "id" SERIAL PRIMARY KEY,
 "name" VARCHAR(50),
 "description" TEXT,
 "estimatedTime" VARCHAR(50) NOT NULL,
 "repository" VARCHAR(120) NOT NULL,
 "startDate" DATE NOT NULL,
 "endDate" DATE,
 "developerId" INTEGER NOT NULL,
 	FOREIGN KEY ("developerId") REFERENCES developers(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS technologies (
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR(30) NOT NULL
);

CREATE TABLE IF NOT EXISTS projects_technologies (
	"id" SERIAL PRIMARY KEY,
	"addedln" DATE NOT NULL,
	"technologyId" INTEGER NOT NULL,
	"projectId" INTEGER NOT NULL,
	FOREIGN KEY ("technologyId") REFERENCES technologies(id),
	FOREIGN KEY ("projectId") REFERENCES projects(id) ON DELETE CASCADE
);

INSERT INTO technologies
	(name) 
VALUES 
	('JavaScript'),
	('Python'),
	('React'),
	('Exppress.js'),
	('HTML'),
	('CSS'),
	('Django'),
	('PostgreSQL'),
	('MongoDB');