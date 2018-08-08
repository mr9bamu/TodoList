const tester = require('graphql-tester').tester;

describe('Graphql quieries should be able to', function () {
    const self = this;
    beforeAll(() => {
        self.test = tester({
            url: 'http://localhost:4000/graphql',
            contentType: 'application/json'
        });
    });
    it('adds a new task', done => {
        self
            .test(
                JSON.stringify({
                    query: `mutation addItem($item: String!, $isDone: Boolean!){
                        addItem(item: $item, isDone: $isDone){
                          id
                          item
                          isDone
                        }
                      }`,
                    variables: {
                        item: "Get new Item added from unit test",
                        isDone: false
                    }
                })
            ).then(res => {
                self.tempID = res.data.addItem.id;
                console.log(self.tempID);
                expect(res.data.addItem.item).toBe("Get new Item added from unit test");
                expect(res.status).toBe(200);
                expect(res.success).toBe(true);
                done();
            }).catch(err => {
                expect(err).toBe(null);
                done();
            });
    });
})