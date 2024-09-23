// import { get } from './dto'
// export const getUser = () => {
//     // try {
//     //     const todo = get()
//     //     return todo
//     // } catch (error) {

//     // }
// }



import type { NextApiRequest, NextApiResponse } from 'next';
import { getDBConnection } from '@/services/dbConection.services';

type User = {
  id: number;
  username: string;
  email: string;
  password: string;
};

// Handler para manejar las solicitudes de la API
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const db = getDBConnection();

  if (req.method === 'POST') {
    // Registro de un nuevo usuario
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: 'Todos los campos son requeridos' });
    }

    const sql = `INSERT INTO users (username, email, password) VALUES (?, ?, ?)`;
    db.run(sql, [username, email, password], function (err) {
      if (err) {
        return res.status(500).json({ message: 'Error al registrar el usuario', error: err.message });
      }

      res.status(200).json({ id: this.lastID, username, email });
    });
  } else if (req.method === 'GET') {
    // Obtener todos los usuarios
    db.all(`SELECT id, username, email FROM users`, [], (err, rows: User[]) => {
      if (err) {
        return res.status(500).json({ message: 'Error al obtener usuarios', error: err.message });
      }

      res.status(200).json(rows);
    });
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  db.close();
}