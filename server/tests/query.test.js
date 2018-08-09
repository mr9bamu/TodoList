const tester = require('graphql-tester').tester;

describe('GraphQL:', function () {
    const self = this;
    beforeAll(() => {
        self.test = tester({
            url: 'http://localhost:4000/graphql',
            contentType: 'application/json'
        });
    });

    //addTask test
    it('This mutation should add a task called newTask', done => {
        self
            .test(
                JSON.stringify({
                    query: `
                        mutation AddTask($name: String!, $isDone: Boolean!){
                          addTask(name: $name, isDone: $isDone){
                            id
                            name
                            isDone
                          }
                        }
                      `,
                    variables: {
                        name: "newTask",
                        isDone: false
                    }
                })
            ).then(res => {
                console.log(res.data);
                self.newID = res.data.addTask.id;
                done();
            })


    });

    //Query test
    it('This query should return all tasks (expect the newTask to be the last one)', done => {
        self
            .test(
                JSON.stringify({
                    query: `
                    query {
                        tasks{
                            id
                            name
                            isDone
                        }
                    }
                `,
                })
            ).then(res => {
                console.log(res.data.tasks);
                const length = res.data.tasks.length - 1
                expect(res.data.tasks[length].id).toBe(self.newID);
                done();
            }).catch(err => {
                expect(err).toBe(null);
                done();
            })
    });

    //updateTask test
    it('This mutation should change the name of newTask to updatedTask', done => {
        self
            .test(
                JSON.stringify({
                    query: `
                    mutation updateTask($id: ID!, $name: String!){
                        updateTask(id:$id, name: $name){
                            id
                            name
                            isDone
                        }
                    }`,
                    variables: {
                        id: self.newID,
                        name: "updatedTask"
                    }
                })
            ).then(res => {
                console.log(res.data);
                expect(res.data.updateTask.name).toBe("updatedTask");
                done();
            })


    });

    //completeTask Test
    it('This mutation should change isDone of updatedTask to true', done => {
        self
            .test(
                JSON.stringify({
                    query: `
                    mutation completeTask($id: ID!, $isDone: Boolean!) {
                        completeTask(id: $id, isDone: $isDone){
                            id
                            name
                            isDone
                        }
                    }
                    `,
                    variables: {
                        id: self.newID,
                        isDone: true
                    }
                })
            ).then(res => {
                console.log(res.data);
                expect(res.data.completeTask.isDone).toBe(true);
                done();
            })


    });

    //removeTask test
    it('This mutation should remove updatedTask', done => {
        self
            .test(
                JSON.stringify({
                    query: `
                        mutation removeTask($id: ID!){
                            removeTask(id:$id){
                                id
                                name
                                isDone
                            }
                        }`,
                    variables: {
                        id: self.newID
                    }
                })
            ).then(res => {
                console.log(res.data);
                expect(res.data.removeTask.id).toBe(self.newID);
                done();
            })

    });
/* Test for incorrect queries */
    //try to remove non existant task
    //add task without field
    //update non existant task
    //etc.

}) 
