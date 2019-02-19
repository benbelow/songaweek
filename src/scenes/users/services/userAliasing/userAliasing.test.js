import * as Aliases from '../../content/Aliases';
import { aliasUserData } from './userAliasing';

function mockAliases(aliases) {
  Aliases.default = aliases || {};
}

describe('aliasUserData', () => {
  it('removes old user', () => {
    const oldUsername = "old";
    const newUsername = "new";
    mockAliases({ [newUsername]: oldUsername });
    const oldData = { username: oldUsername, submissions: [1, 2, 3] };
    const newData = { username: newUsername, submissions: [1, 2, 3] };

    const aliasedData = aliasUserData([oldData, newData]);

    expect(aliasedData.find(u => u.username === oldUsername)).toBeUndefined();
  });

  it('appends old submissions to new username', () => {
    const oldUsername = "old";
    const newUsername = "new";
    mockAliases({ [newUsername]: oldUsername });
    const newData = { username: newUsername, submissions: [1, 2, 3] };
    const oldData = { username: oldUsername, submissions: [4, 5, 6] };

    const aliasedData = aliasUserData([oldData, newData]);

    expect(aliasedData.find(u => u.username === newUsername).submissions.length).toBe(6);
  });
});
