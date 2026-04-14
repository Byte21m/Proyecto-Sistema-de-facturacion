import db from '../../db/index.js';

const createSession = ({ jwtid, userId }) => {
  const statement = db.prepare('INSERT INTO sessions (jwtid, user_id) VALUES (?, ?)');
  statement.run(jwtid, userId);
};

const findSessionById = (jwtid) => {
  const statement = db.prepare('SELECT * FROM sessions WHERE jwtid = ?');
  return statement.get(jwtid);
};

export default {
  createSession,
  findSessionById
};
