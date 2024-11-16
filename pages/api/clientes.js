// pages/api/clientes.js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  try {
    if (req.method === 'GET') {
      // Obtener los clientes desde la base de datos
      const clientes = await prisma.cliente.findMany();
      res.status(200).json(clientes);  // Responder con la lista de clientes
    } else if (req.method === 'POST') {
      // Crear un nuevo cliente
      const { nombres, apellidos, genero, fechaNacimiento, estado } = req.body;
      const cliente = await prisma.cliente.create({
        data: {
          nombres,
          apellidos,
          genero,
          fechaNacimiento: new Date(fechaNacimiento),
          estado,
        },
      });
      res.status(201).json(cliente);  // Responder con el cliente creado
    } else {
      res.status(405).json({ message: 'Método no permitido' });  // Si el método no es GET ni POST
    }
  } catch (error) {
    console.error(error);  // Log para ver los detalles del error
    res.status(500).json({ message: 'Error en el servidor' });  // Responder con error de servidor
  }
}

