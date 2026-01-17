// app/lib/utils/path.ts
/**
 * アバター画像のパスを正規化する。
 * - 先頭の `/` が無い場合は付与
 * - 空/未定義はデフォルト画像にフォールバック
 */
export const normalizeAvatarPath = (path: string | null | undefined): string => {
  const fallback = "/avatars/default.png";
  const p = (path ?? "").trim();
  if (p === "") return fallback;
  return p.startsWith("/") ? p : `/${p}`;
};
