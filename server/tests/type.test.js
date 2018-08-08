import { graphql } from 'graphql';
import { schema } from '../../schema';
import {
  User,
} from '../graphql/types';
import {
  getContext,
  setupTest,
} from '../../../test/helper';

beforeEach(async () => await setupTest());
it('should be null when user is not logged in', async () => {
  //language=GraphQL
  const query = `
    query Q {
      viewer {
        me {
          name
        }
      }
    }
  `;

  const rootValue = {};
  const context = getContext();

  const result = await graphql(schema, query, rootValue, context);
  const { data } = result;

  expect(data.viewer.me).toBe(null);
});

it('should return the current user when user is logged in', async () => {
  const user = new User({
    name: 'user',
    email: 'user@example.com',
  });
  await user.save();
  //language=GraphQL
  const query = `
    query Q {
      viewer {
        me {
          name        
        }
      }
    }
  `;

  const rootValue = {};
  const context = getContext({ user });

  const result = await graphql(schema, query, rootValue, context);
  const { data } = result;

  expect(data.viewer.me.name).toBe(user.name);
});