-- CreateTable
CREATE TABLE "Cliente" (
    "id" SERIAL NOT NULL,
    "nombres" TEXT NOT NULL,
    "apellidos" TEXT NOT NULL,
    "genero" TEXT NOT NULL,
    "fechaNacimiento" TIMESTAMP(3) NOT NULL,
    "estado" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Cliente_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InformacionCliente" (
    "id" SERIAL NOT NULL,
    "tipoInformacion" TEXT NOT NULL,
    "fechaCreacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fechaActualizacion" TIMESTAMP(3),
    "usuarioCreador" TEXT NOT NULL,
    "estado" BOOLEAN NOT NULL DEFAULT true,
    "clienteId" INTEGER NOT NULL,

    CONSTRAINT "InformacionCliente_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "InformacionCliente_clienteId_idx" ON "InformacionCliente"("clienteId");

-- AddForeignKey
ALTER TABLE "InformacionCliente" ADD CONSTRAINT "InformacionCliente_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "Cliente"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
