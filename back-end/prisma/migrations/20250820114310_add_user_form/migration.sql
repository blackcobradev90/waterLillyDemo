-- CreateEnum
CREATE TYPE "public"."Income" AS ENUM ('LESS_THAN_50K', 'BETWEEN_50K_100K', 'ABOVE_100K');

-- CreateEnum
CREATE TYPE "public"."Coverage" AS ENUM ('MYSELF', 'FAMILY');

-- CreateTable
CREATE TABLE "public"."User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "age" INTEGER,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."UserForm" (
    "id" SERIAL NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "postCode" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "birthday" TIMESTAMP(3) NOT NULL,
    "expectedIncome" "public"."Income" NOT NULL,
    "pregnantOrAdopting" BOOLEAN NOT NULL,
    "coverage" "public"."Coverage" NOT NULL,
    "tobaccoUser" BOOLEAN NOT NULL,
    "majorMedicalCondition" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserForm_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "public"."User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "UserForm_email_key" ON "public"."UserForm"("email");
