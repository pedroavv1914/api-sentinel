/*
  Warnings:

  - Added the required column `created_by` to the `entity_snapshots` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "entity_snapshots" ADD COLUMN     "created_by" TEXT NOT NULL,
ADD COLUMN     "diff" JSONB,
ADD COLUMN     "event_id" TEXT;
