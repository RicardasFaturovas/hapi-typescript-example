// import * as sinon from 'sinon';
// import * as Mongoose from 'mongoose';
// import { expect } from 'chai';
// import * as Project from '../../src/projects';
// import * as Configs from "../../src/configurations";
// import * as Server from "../../src/server";
// import * as Database from "../../src/database";
//
// const database = Database.init(configDb);
//
// // test utility
// function areObjectIdsEqual(id1: Mongoose.Types.ObjectId | string, id2: Mongoose.Types.ObjectId | string) {
//   let normalizedId1: Mongoose.Types.ObjectId = new Mongoose.Types.ObjectId(id1.toString());
//   let normalizedId2: Mongoose.Types.ObjectId = new Mongoose.Types.ObjectId(id2.toString());
//   return normalizedId1.equals(normalizedId2);
// }
//
// // test utility
// function matchGivenFields(expected) {
//   return function(actual) {
//     let result: boolean = true;
//     for (let key of Object.keys(expected)) {
//       if (expected[key] instanceof Mongoose.Types.ObjectId || actual[key] instanceof Mongoose.Types.ObjectId || key === '_id') {
//         if (!areObjectIdsEqual(expected[key], actual[key])) {
//           console.error('Mismatching ids on: ', key, ', expected: ', expected[key], 'actual: ', actual[key]);
//           result = false;
//         }
//       } else {
//         if ((actual[key] !== expected[key])) {
//           console.error('Mismatching on: ', key, ', expected: ', expected[key], 'actual: ', actual[key]);
//           result = false;
//         }
//       }
//     }
//     if (!result) {
//       console.log(actual);
//     }
//     return result;
//   };
// }
//
// function createProject() {
//   let newProject = {
//     name : 'newProj',
//     users: [],
//     tasks: [],
//     description: 'newProj'
//   }
//   return Promise.resolve(database.projectModel.create(newProject));
// }
//
// function findProject(id) {
//   return database.projectModel.findOne({ _id: id });
// }
//
// describe('simple Mongoose persistence testing', () => {
//
//   let insertStub: sinon.SinonStub;
//
//   let projetFindStub: sinon.SinonStub;
//   beforeEach(() => {
//     insertStub = sinon.stub(Mongoose.Collection.prototype, 'insert', function(docs, options, callback) {
//       // console.log('docs', docs);
//       callback(null, docs);
//     });
//
//     projetFindStub = sinon.stub(Project, 'findOne');
//
//     projetFindStub.withArgs(sinon.match(matchGivenFields({_id: '58c7fede92a94ab40d8ce49f'}))).returns(Promise.resolve({_id: '58c7fede92a94ab40d8ce49f'}));
//     projetFindStub.withArgs({_id: '58c7fede92a94ab40daaaaaa'}).returns(Promise.resolve(null));
//     projetFindStub.withArgs(sinon.match.any).returns(Promise.resolve(null));
//
//   });
//
//   afterEach(() => {
//     insertStub.restore();
//     projetFindStub.restore();
//   });
//
//   it('should detect that mongoose model was saved', done => {
//
//     createProject.then(() => {
//       expect(insertStub.calledOnce).to.be.true;
//       expect(insertStub.calledWith(sinon.match(matchGivenFields({
//         name : 'newProj',
//           users: [],
//           tasks: [],
//           description: 'newProj'
//       })))).to.be.true;
//       done();
//     })
//
//   });
//
//   it('should find user John', done => {
//     findProject('58c7fede92a94ab40d8ce49f').then(() => {
//       expect(projetFindStub.calledOnce).to.be.true;
//       expect(projetFindStub.calledWith(sinon.match(matchGivenFields({
//         _id: '58c7fede92a94ab40d8ce49f'
//       })))).to.be.true;
//       done();
//     })
//   });
//
//   it('should not find user John', done => {
//     findProject('John').then((user) => {
//       expect(user).to.be.null;
//       expect(projetFindStub.calledOnce).to.be.true;
//       expect(projetFindStub.calledWith(sinon.match(matchGivenFields({
//         _id: '58c7fede92a94ab40daaaaaa'
//       })))).to.be.true;
//       done();
//     })
//   });
// });
