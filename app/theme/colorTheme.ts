// app/theme/colorThemes.ts
export const COLOR_THEMES = {
  default: {
    light: {
      primary: "#ffffff",
      secondary: "#e5e5e5",
      text: "#111111",
    },
    dark: {
      primary: "#191919",
      secondary: "#444444",
      text: "#f5f5f5",
    },
  },
  blue: {
    light: {
      primary: "#e0f2ff",
      secondary: "#bae6fd",
      text: "#0c4a6e",
    },
    dark: {
      primary: "#0c4a6e",
      secondary: "#075985",
      text: "#e0f2ff",
    },
  },
  green: {
    light: {
      primary: "#ecfdf5",
      secondary: "#bbf7d0",
      text: "#065f46",
    },
    dark: {
      primary: "#065f46",
      secondary: "#047857",
      text: "#ecfdf5",
    },
  },
  purple: {
    light: {
      primary: "#f5f3ff",
      secondary: "#ddd6fe",
      text: "#4c1d95",
    },
    dark: {
      primary: "#4c1d95",
      secondary: "#5b21b6",
      text: "#f5f3ff",
    },
  },
  orange: {
    light: {
      primary: "#EDA35A",
      secondary: "#FFD09B",
      text: "#9a3412",
    },
    dark: {
      primary: "#9a3412",
      secondary: "#c2410c",
      text: "#FFE8CD",
    },
  },
} as const;

export type ColorThemeKey = keyof typeof COLOR_THEMES;
