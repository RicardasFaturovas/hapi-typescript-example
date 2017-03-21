import * as Hapi from "hapi";
import * as Boom from "boom";
import { IDatabase } from "../database";
import { IServerConfigurations } from "../configurations";
import {IProject} from "./project";

export default class ProjectController {

  private database: IDatabase;
  private configs: IServerConfigurations;

  constructor(configs: IServerConfigurations, database: IDatabase) {
    this.configs = configs;
    this.database = database;
  }

  public createProject(request: Hapi.Request, reply: Hapi.IReply) {
    let userId = request.auth.credentials.id;
    let newProject: IProject = request.payload;
    if (newProject.users.every(el => el !== userId)) {
      newProject.users.push(userId);
    }

    this.database.projectModel.create(newProject).then((project) => {
      reply(project).code(201);
    }).catch((error) => {
      reply(Boom.badImplementation(error));
    });
  }

  public getProjectById(request: Hapi.Request, reply: Hapi.IReply) {
    let id = request.params["id"];

    this.database.projectModel.findOne({ _id: id })
      .populate('users', 'email name')
      .populate('tasks')
      .then((project: IProject) => {
      if (project) {
        reply(project);
      } else {
        reply(Boom.notFound());
      }
    }).catch((error) => {
      reply(Boom.badImplementation(error));
    });
  }

  public getProjects(request: Hapi.Request, reply: Hapi.IReply) {
    let top = request.query.top;
    let skip = request.query.skip;
    let description = request.query.description;

    this.database.projectModel.find({ description: { "$regex": `^${description.toLowerCase()}`, "$options":1} })
      .populate('users', 'email name')
      .populate('tasks', 'name description')
      .skip(skip).limit(top)
      .then((projects: Array<IProject>) => {
      reply(projects);
    }).catch((error) => {
      reply(Boom.badImplementation(error));
    });
  }

  public deleteProject(request: Hapi.Request, reply: Hapi.IReply) {
    let id = request.params["id"];
    let userId = request.auth.credentials.id;

    this.database.projectModel.findOneAndRemove({ _id: id, userId: [userId] }).then((deletedProject: IProject) => {
      if (deletedProject) {
        reply(deletedProject);
      } else {
        reply(Boom.notFound());
      }
    }).catch((error) => {
      reply(Boom.badImplementation(error));
    });
  }

  public updateProject(request: Hapi.Request, reply: Hapi.IReply) {
    let userId = request.auth.credentials.id;
    let id = request.params["id"];
    let project: IProject = request.payload;

    this.database.projectModel.findByIdAndUpdate({ _id: id, userId: [userId] }, { $set: project }, { new: true })
      .then((updatedProject: IProject) => {
        if (updatedProject) {
          reply(updatedProject);
        } else {
          reply(Boom.notFound());
        }
      }).catch((error) => {
      reply(Boom.badImplementation(error));
    });
  }

}
