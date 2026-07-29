/*
  Warnings:

  - You are about to drop the column `deadline` on the `SavingsGoal` table. All the data in the column will be lost.
  - You are about to drop the column `saved` on the `SavingsGoal` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "SavingsContribution" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "amount" REAL NOT NULL,
    "date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "goalId" INTEGER NOT NULL,
    CONSTRAINT "SavingsContribution_goalId_fkey" FOREIGN KEY ("goalId") REFERENCES "SavingsGoal" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_SavingsGoal" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "target" REAL NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_SavingsGoal" ("createdAt", "id", "name", "target") SELECT "createdAt", "id", "name", "target" FROM "SavingsGoal";
DROP TABLE "SavingsGoal";
ALTER TABLE "new_SavingsGoal" RENAME TO "SavingsGoal";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
