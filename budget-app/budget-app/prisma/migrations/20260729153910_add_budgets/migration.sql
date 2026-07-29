-- CreateTable
CREATE TABLE "Budget" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "category" TEXT NOT NULL,
    "amount" REAL NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Budget_category_key" ON "Budget"("category");
