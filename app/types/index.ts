// /app/types/index.ts

/**
 * interface と types の違いは
 * 上書き出るか型を細かく指定できるかの違い
 * 
 * import type { UserProfile } from "@/types";
 * 解決の優先順位
 * @/types/index.ts        ← 最優先（存在すればここから）
 * @/types/index.tsx
 * @/types/index.d.ts
 * @/types.ts             ← ディレクトリと同名のファイル
 * @/types.d.ts
 * 
 */
export interface UserProfile {
  id: string;
  name: string;
  email: string;
  email_verified_at: string | null;
  role: string;
  theme_mode?: "light" | "dark";
  color_theme: string;
  light_primary_main: string;     // 未使用
  light_secondary_main: string;   // 未使用
  dark_primary_main: string;      // 未使用
  dark_secondary_main: string;    // 未使用
  avatar_path: string;
  mark_article_as_unread: boolean;
  order_no: number;
  available: boolean;
  created_at: string;
  updated_at: string;
}
// データベース用（id: number）
export interface UserProfileDB  {
  id: string;
  name: string;
  email: string;
  email_verified_at: string | null;
  role: string;
  theme_mode?: "light" | "dark";
  color_theme: string;
  light_primary_main: string;     // 未使用
  light_secondary_main: string;   // 未使用
  dark_primary_main: string;      // 未使用
  dark_secondary_main: string;    // 未使用
  avatar_path: string;
  mark_article_as_unread: boolean;
  order_no: number;
  available: boolean;
  created_at: string;
  updated_at: string;
}