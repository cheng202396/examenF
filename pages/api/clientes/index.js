import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { nombres, apellidos, genero, fechaNacimiento, estado } = req.body;

    try {
      const nuevoCliente = await prisma.cliente.create({
        data: { nombres, apellidos, genero, fechaNacimiento: new Date(fechaNacimiento), estado }
      });
      res.status(201).json(nuevoCliente);
    } catch (error) {
      res.status(500).json({ error: "Error al crear el cliente" });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
