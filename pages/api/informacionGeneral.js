// pages/api/informacionGeneral.js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'GET') {
    // Obtener la información general
    const informacion = await prisma.informacionGeneral.findMany();
    res.status(200).json(informacion);  // Responder con la información general
  } else if (req.method === 'POST') {
    // Crear nueva información general
    const { tipoInformacion, fechaCreacion, usuarioCreador, estado } = req.body;
    const informacion = await prisma.informacionGeneral.create({
      data: {
        tipoInformacion,
        fechaCreacion: new Date(fechaCreacion),
        usuarioCreador,
        estado,
      },
    });
    res.status(201).json(informacion);  // Responder con la información creada
  } else {
    res.status(405).json({ message: 'Método no permitido' });  // Si el método no es GET ni POST
  }
}
