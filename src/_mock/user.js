import { faker } from '@faker-js/faker';
import { sample } from 'lodash';

// ----------------------------------------------------------------------
const Names = [
  'Noa Toladano',
  'Lina Sarhan',
  'Anas Dawik',
  'Majd Shaheen',
  'Chaya Neeman',
  'Naomi Travelsi',
  'Aya Golani',
  'Hadar Bonen',
  'Sundus Yusuf',
  'Talia',
  'Magid Sharbati',
  'Bisan Komber',
  'Mohammad Abu Hadwan',
  'Aya Sultan',
  'Gefen Azulay',
  'Asraa Yahiya',
  'Noam Yoshaa',
  'Mariam Musa',
  'Katie',
  'Daniel',
  'Yasmin',
  'Amina',
  'Nikita',
  'Daniyah Abu Eid',
  'Tali M',
  'Diana',
  'Omar',
  'Cynthia',
  'Mayan',
  'Asil',
  'Saba',
  'Magid Razem',
  'Mohannad',
  'Saraa',
  'Hasan',
  'Sariq',
  'Noa',
  'Abraham',
  'Mohammad Razem',
]
const users = Names.map((WorkerName, index) => ({
  id: faker.datatype.uuid(),
  avatarUrl: `/assets/images/avatars/avatar_${Names.length%index}.jpg`,
  name: WorkerName,
  department: sample(['Women', 'Men', 'Kids']),
  status: sample(['filled', 'not yet']),
  role: sample(['Manager', 'VC Designer', 'Sales Assistant', 'Casher', 'CE-NT', 'OP']),
  skills: sample(['Manager', 'VC Designer', 'Sales Assistant', 'Casher', 'CE-NT', 'OP']),
}));


export default users;
