#!/usr/bin/env tsx

/**
 * 本番環境用のPrismaDBをMigrateします
 * 使い方:
 *   npx tsx scripts/prisma-migrate-tool reset
 *   npx tsx scripts/prisma-migrate-tool deploy
 *   SEEDはnpx tsx scripts/seed を使う
 *   
 */
import dotenv from "dotenv";
import { execSync } from 'child_process'
import path from 'path'
import { fileURLToPath } from 'url'

/**
 * 本番の場合は切替え
 */
//dotenv.config({ path: '.env.production' });
dotenv.config({ path: '.env' });

// ESモジュール用の __dirname 定義
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

type MigrationType = 'deploy' | 'reset' | 'status' | 'push' | 'seed'

interface MigrationConfig {
  type: MigrationType
  name?: string
  databaseUrl: string
  schemaPath: string
}

// コマンドライン引数から取得
const migrationType = (process.argv[2] || 'deploy') as MigrationType
const migrationName = process.argv[3]

// 環境変数からデータベースURLを取得
const databaseUrl = process.env.DATABASE_URL
console.log(`実行データベース：${databaseUrl}`)

if (!databaseUrl) {
  console.error('❌ エラー: DATABASE_URL環境変数が設定されていません')
  console.log('\n使い方:')
  console.log('  DATABASE_URL=postgresql://user:pass@host:5432/db tsx scripts/migrate.ts deploy')
  console.log('  DATABASE_URL=postgresql://user:pass@host:5432/db tsx scripts/migrate.ts dev init')
  process.exit(1)
}

// スキーマファイルのパスを設定
const schemaPath = path.join(__dirname, '..', 'prisma', 'schema.prisma')
const config: MigrationConfig = {
  type: migrationType,
  name: migrationName,
  databaseUrl,
  schemaPath,
}

/**
 * パスワードをマスクしたURLを返す
 */
function maskPassword(url: string): string {
  // 通常のパスワード形式 (postgresql://user:password@host)
  let masked = url.replace(/:[^:@]+@/, ':****@')

  // API key形式 (?api_key=xxx)
  masked = masked.replace(/([?&]api_key=)([^&]{4})[^&]*/, '$1$2****')

  return masked
}

/**
 * マイグレーションコマンドを構築
 */
function buildCommand(config: MigrationConfig): string {
  const { type, schemaPath } = config

  switch (type) {
    case 'deploy':
      // 本番環境用: マイグレーションを適用
      return `npx prisma migrate deploy --schema="${schemaPath}"`

    case 'reset':
      // データベースをリセット
      return `npx prisma migrate reset --force --schema="${schemaPath}"`

    case 'status':
      // マイグレーションステータスを確認
      return `npx prisma migrate status --schema="${schemaPath}"`

    case 'push':
      // スキーマを直接プッシュ（マイグレーションファイルなし）
      return `npx prisma db push --schema="${schemaPath}"`

    case 'seed':
      // シードデータを投入
      return `npx prisma db seed`

    default:
      console.error(`❌ エラー: 不明なコマンド "${type}"`)
      console.log('\n利用可能なコマンド:')
      console.log('  deploy - マイグレーションを適用')
      console.log('  reset  - データベースをリセット')
      console.log('  status - マイグレーションステータスを確認')
      console.log('  push   - スキーマを直接プッシュ')
      process.exit(1)
  }
}

/**
 * マイグレーションを実行
 */
async function runMigration(config: MigrationConfig): Promise<void> {
  console.log('🔧 Prismaマイグレーション実行')
  console.log(`📁 スキーマ: ${config.schemaPath}`)
  console.log(`🗄️  データベース: ${maskPassword(config.databaseUrl)}`)
  console.log(`📝 コマンド: prisma migrate ${config.type}\n`)

  try {
    const command = buildCommand(config)

    // コマンドを実行
    execSync(command, {
      env: { ...process.env, DATABASE_URL: config.databaseUrl },
      stdio: 'inherit',
    })

    console.log('\n✅ マイグレーション完了')
  } catch (error) {
    console.error('\n❌ マイグレーション失敗')
    if (error instanceof Error) {
      console.error(error.message)
    }
    process.exit(1)
  }
}

// メイン処理
runMigration(config)