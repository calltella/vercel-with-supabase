// app/(protected)/ThemeVariablesClient.tsx
"use client";

import { useTheme } from "next-themes";
import { useEffect } from "react";
import { COLOR_THEMES, ColorThemeKey } from "@/app/theme/colorTheme";

type Props = {
  paletteKey: ColorThemeKey;
};

export default function ThemeVariablesClient({ paletteKey }: Props) {
  const { resolvedTheme } = useTheme();
  //console.log("resolvedTheme:", resolvedTheme);
  useEffect(() => {
    if (!resolvedTheme) return;
    const safeKey: ColorThemeKey =
      paletteKey && paletteKey in COLOR_THEMES ? paletteKey : "default";
    const palette = COLOR_THEMES[safeKey];

    const vars = resolvedTheme === "dark" ? palette.dark : palette.light;

    //console.group("[ThemeVariablesClient]");
    //console.log("paletteKey:", paletteKey);
    //console.log("resolvedTheme:", resolvedTheme);
    //console.log("vars:", vars);

    Object.entries(vars).forEach(([key, value]) => {
      const cssVar = `--color-${key}`;
      document.documentElement.style.setProperty(cssVar, value);
      //console.log(cssVar, value);
    });

    //console.groupEnd();
  }, [paletteKey, resolvedTheme]);

  return null;
}
