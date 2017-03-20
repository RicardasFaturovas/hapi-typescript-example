import * as Hapi from "hapi";
import * as Joi from "joi";
import { jwtValidator } from "../users/user-validator";
import * as ProjectValidator from "./project-validator";
import { IDatabase } from "../database";
import { IServerConfigurations } from "../configurations";
import ProjectController from "./project-controller";

export default function (server: Hapi.Server, configs: IServerConfigurations, database: IDatabase) {

  const projectController = new ProjectController(configs, database);
  server.bind(projectController);

  server.route({
    method: 'GET',
    path: '/projects/{id}',
    config: {
      handler: projectController.getProjectById,
      auth: "jwt",
      tags: ['api', 'projects'],
      description: 'Get project by id.',
      validate: {
        params: {
          id: Joi.string().required()
        },
        headers: jwtValidator
      },
      plugins: {
        'hapi-swagger': {
          responses: {
            '200': {
              'description': 'Project found.'
            },
            '404': {
              'description': 'Project does not exists.'
            }
          }
        }
      }
    }
  });

  server.route({
    method: 'GET',
    path: '/projects',
    config: {
      handler: projectController.getProjects,
      auth: "jwt",
      tags: ['api', 'projects'],
      description: 'Get all projects.',
      validate: {
        query: {
          top: Joi.number().default(5),
          skip: Joi.number().default(0)
        },
        headers: jwtValidator
      }
    }
  });

  server.route({
    method: 'POST',
    path: '/projects',
    config: {
      handler: projectController.createProject,
      auth: "jwt",
      tags: ['api', 'tasks'],
      description: 'Create a Project.',
      validate: {
        payload: ProjectValidator.createProjectModel,
        headers: jwtValidator
      },
      plugins: {
        'hapi-swagger': {
          responses: {
            '201': {
              'description': 'Created Project.'
            }
          }
        }
      }
    }
  });

  server.route({
    method: 'PUT',
    path: '/projects/{id}',
    config: {
      handler: projectController.updateProject,
      auth: "jwt",
      tags: ['api', 'tasks'],
      description: 'Update Project by id.',
      validate: {
        params: {
          id: Joi.string().required()
        },
        payload: ProjectValidator.updateProjectModel,
        headers: jwtValidator
      },
      plugins: {
        'hapi-swagger': {
          responses: {
            '200': {
              'description': 'Deleted Project.',
            },
            '404': {
              'description': 'Project does not exist.'
            }
          }
        }
      }
    }
  });

  server.route({
    method: 'DELETE',
    path: '/projects/{id}',
    config: {
      handler: projectController.deleteProject,
      auth: "jwt",
      tags: ['api', 'tasks'],
      description: 'Delete project by id.',
      validate: {
        params: {
          id: Joi.string().required()
        },
        headers: jwtValidator
      },
      plugins: {
        'hapi-swagger': {
          responses: {
            '200': {
              'description': 'Deleted Project.',
            },
            '404': {
              'description': 'Project does not exist.'
            }
          }
        }
      }
    }
  });


}
