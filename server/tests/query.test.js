import { makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools';
import { graphql } from 'graphql';
import { GraphQLError } from 'graphql/error';

const {
  typeDefs,
} = require('../../../../core/schema/index');

const schema = makeExecutableSchema({ typeDefs });
addMockFunctionsToSchema({ schema });

describe('GraphQL Query', () => {
  const query = `
    query getUserData {
        me {
            id
            client(id: 43) {
                id
                project(id: 2) {
                    id
                    contract(id: 8) {
                        id
                        kbes {
                            kbe_id
                            kbe_references {
                                annotation_id
                                ranges {
                                    start
                                    end
                                    startOffset
                                    endOffset
                                }
                            }
                        }
                    }
                }
            }
        }
    }
  `;
  test('run successfully', () => {
    graphql(schema, query).then((result) => {
      expect(result).toBeTruthy();
    });
  });

  test('annotation range resolves startOffset', () => {
    graphql(schema, query).then((result) => {
      expect(result.data.me.client.project.contract.kbes
        .kbe_references.ranges.startOffset).toBe(43);
    });
  });

  test('result is not null', () => {
    graphql(schema, query).then((result) => {
      expect(result).not.toBeNull();
    });
  });
});

describe('GraphQL Query', () => {
  // Should throw GraphQLError
  // message: 'Syntax Error GraphQL request Expected Name, found }'
  const query = `
    query getUserData {
        me {
            id
            client(id: 43) {
                id
                project(id: 2) {
                    id
                    contract(id: 8) {
                        id
                        kbes {
                            kbe_id
                            kbe_references {
                                annotation_id
                                ranges {
                                }
                            }
                        }
                    }
                }
            }
        }
    }
  `;

  test('Throws GraphQLError if no field selected for annotation ranges', () => {
    graphql(schema, query)
      .catch((result) => {
        expect(result).toThrow(GraphQLError);
      });
  });
});
