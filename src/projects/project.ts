import * as Mongoose from "mongoose";

export interface IProject extends Mongoose.Document {
  name: string;
  users: Array<String>;
  tasks: Array<String>;
  description: String;
  createdAt: Date;
  updateAt: Date;
};

export const ProjectSchema = new Mongoose.Schema({
  name: { type: String, unique:true, required: true },
  users: [{type: Mongoose.Schema.Types.ObjectId, ref: 'User'}],
  tasks: [{type: Mongoose.Schema.Types.ObjectId, ref: 'Task'}],
  description: { type: String, required: false },
}, {
  timestamps: true
});

export const ProjectModel = Mongoose.model<IProject>('Project', ProjectSchema);
