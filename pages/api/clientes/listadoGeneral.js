
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const clientes = await prisma.cliente.findMany({
        include: { informacion: true },
        orderBy: [{ fechaCreacion: 'asc' }, { apellidos: 'asc' }]
      });
      res.status(200).json(clientes);
    } catch (error) {
      res.status(500).json({ error: "Error al obtener el listado de clientes" });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
