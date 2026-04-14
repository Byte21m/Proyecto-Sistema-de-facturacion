import db from '../../db/index.js';

const createUser = ({ nombre, usuario, passwordHash, rol }) => {
  const stmt = db.prepare('INSERT INTO users (nombre, usuario, password_hash, rol) VALUES (?, ?, ?, ?)');
  const info = stmt.run(nombre, usuario, passwordHash, rol);
  
  return {
    id: info.lastInsertRowid,
    nombre,
    usuario,
    rol
  };
};

const findUserByUsername = (usuario) => {
  const stmt = db.prepare('SELECT * FROM users WHERE usuario = ?');
  return stmt.get(usuario);
};

export default {
  createUser,
  findUserByUsername
};
