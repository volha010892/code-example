import faker from 'faker/locale/ru';

const mockData = {
  userId: faker.random.words(),
  getUsers: () => true,
  lockoutMessage: faker.random.words(),
};

export default mockData;