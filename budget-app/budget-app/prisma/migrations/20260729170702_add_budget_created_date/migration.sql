-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Budget" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "category" TEXT NOT NULL,
    "amount" REAL NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Budget" ("amount", "category", "id") SELECT "amount", "category", "id" FROM "Budget";
DROP TABLE "Budget";
ALTER TABLE "new_Budget" RENAME TO "Budget";
CREATE UNIQUE INDEX "Budget_category_key" ON "Budget"("category");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
