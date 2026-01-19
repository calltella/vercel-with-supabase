"use client";

// app/components/nav/ProfileMenu.tsx

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

type MenuLinkProps = {
  href: string;
  disabled: boolean;
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
};

function MenuLink({
  href,
  disabled,
  children,
  onClick,
  className = "",
}: MenuLinkProps) {
  if (disabled) {
    return (
      <span
        aria-disabled="true"
        className={`block px-4 py-2 opacity-50 cursor-not-allowed ${className}`}
      >
        {children}
      </span>
    );
  }

  return (
    <Link
      href={href}
      onClick={onClick}
      className={`block px-4 py-2 hover:bg-(--color-primary) ${className}`}
    >
      {children}
    </Link>
  );
}

type Props = {
  userName: string;
  avatarsImage: string;
};

export default function ProfileMenu({ userName, avatarsImage }: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="relative" ref={ref}>
      {/* アバター */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="cursor-pointer block bg-white rounded-full p-0.5"
        aria-haspopup="true"
        aria-expanded={open}
      >
        <Image
          src={avatarsImage}
          className="rounded-full object-cover"
          height={45}
          width={45}
          alt="avatar"
          key={avatarsImage}
          unoptimized
        />
      </button>

      {open && (
        <div className="border border-(--color-text) absolute right-0 mt-2 w-48 text-(--color-text) rounded-md shadow-lg z-50 bg-(--color-secondary)">
          <div className="px-4 py-2 text-sm">
            {userName} さんがログイン中
          </div>
          <div className="border-t" />

          <MenuLink
            href="/user/profile"
            disabled={pathname === "/user/profile"}
            onClick={() => setOpen(false)}
          >
            プロフィール
          </MenuLink>

          <MenuLink
            href="/user/dashboard"
            disabled={pathname === "/user/dashboard"}
            onClick={() => setOpen(false)}
          >
            ダッシュボード
          </MenuLink>

          <MenuLink
            href="/user//packages"
            disabled={pathname === "/user/packages"}
            onClick={() => setOpen(false)}
          >
            パッケージリスト
          </MenuLink>

          <MenuLink
            href="/user//settings"
            disabled={pathname === "/user/settings"}
            onClick={() => setOpen(false)}
          >
            設定
          </MenuLink>

          <MenuLink
            href="/logout"
            disabled={false}
            className="text-red-600"
          >
            ログアウト
          </MenuLink>
        </div>
      )}
    </div>
  );
}
