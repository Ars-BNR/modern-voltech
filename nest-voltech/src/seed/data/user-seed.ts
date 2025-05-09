import * as bcrypt from 'bcryptjs';

const user = [
  {
    id: 1,
    login: 'adminius',
    password: bcrypt.hashSync('admin', 10),
    role: 'admin',
  },
];
export default user;
