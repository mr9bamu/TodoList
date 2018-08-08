const tester = require('graphql-tester').tester;

describe('Graphql quieries should be able to', function () {
    const self = this;
    beforeAll(() => {
        self.test = tester({
            url: 'http://localhost:4000/graphql',
            contentType: 'application/json'
        });
    });

    it('should return all tasks', done => {
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
                /*expect(res.data.tasks[0].id).toBe(self.tempID);
                expect(res.data.tasks[0].item).toBe("Get new Item added from unit test");
                expect(res.data.tasks[0].isDone).toBe(false);
                expect(res.success).toBe(true);
                expect(res.status).toBe(200);*/
                done();
            }).catch(err => {
                expect(err).toBe(null);
                done();
            })
    });
}) 
