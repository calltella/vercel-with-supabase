import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
import { sql } from 'drizzle-orm';

export const notes = sqliteTable('notes', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  title: text('title').notNull(),
  content: text('content'),
  createdAt: text('created_at')
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
});

// schemaからTypeを宣言（読み取り用）
export type Note = typeof notes.$inferSelect;

// schemaからTypeを宣言（書き込み用）
export type NewNote = typeof notes.$inferInsert;