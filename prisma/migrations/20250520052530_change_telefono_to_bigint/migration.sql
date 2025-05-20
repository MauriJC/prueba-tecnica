/*
  Warnings:

  - You are about to alter the column `telefono` on the `Contacto` table. The data in that column could be lost. The data in that column will be cast from `Int` to `BigInt`.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Contacto" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nombre" TEXT NOT NULL,
    "apellido" TEXT NOT NULL,
    "telefono" BIGINT NOT NULL,
    "idProvincia" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Contacto_idProvincia_fkey" FOREIGN KEY ("idProvincia") REFERENCES "Provincia" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Contacto" ("apellido", "createdAt", "id", "idProvincia", "nombre", "telefono") SELECT "apellido", "createdAt", "id", "idProvincia", "nombre", "telefono" FROM "Contacto";
DROP TABLE "Contacto";
ALTER TABLE "new_Contacto" RENAME TO "Contacto";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
