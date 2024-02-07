import { nextui } from "@nextui-org/react";
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],

  plugins: [
    nextui({
      themes: {
        theme_purple: {
          colors: {
            background: "#0D001A",
            foreground: "#FEECFE",
            content1: {
              50: "#FEECFE",
              100: "#FDD5F9",
              200: "#FCADF9",
              300: "#F182F6",
              400: "#DD62ED",
              500: "#C031E2",
              600: "#9823C2",
              700: "#7318A2",
              800: "#520F83",
              900: "#3B096C",
              DEFAULT: "#DD62ED",
              foreground: "#FFFFFF",
            },
          },
        },

        theme_pink: {
          colors: {
            background: "#1A001A",
            foreground: "#F8BBD0",
            content1: {
              50: "#FCE4EC",
              100: "#F8BBD0",
              200: "#F48FB1",
              300: "#F06292",
              400: "#EC407A",
              500: "#E91E63",
              600: "#D81B60",
              700: "#C2185B",
              800: "#AD1457",
              900: "#880E4F",
              DEFAULT: "#E91E63",
              foreground: "#FFFFFF",
            },
          },
        },

        theme_blue: {
          colors: {
            background: "#0D1C33",
            foreground: "#BAE3FF",
            content1: {
              50: "#E6F7FF",
              100: "#BAE3FF",
              200: "#7CC4FA",
              300: "#47A3F3",
              400: "#2186EB",
              500: "#0967D2",
              600: "#0552B5",
              700: "#03449E",
              800: "#01337D",
              900: "#002159",
              DEFAULT: "#0967D2",
              foreground: "#FFFFFF",
            },
          },
        },

        theme_green: {
          colors: {
            background: "#081C15",
            foreground: "#C3E2C9",
            content1: {
              50: "#E6F4EA",
              100: "#C3E2C9",
              200: "#9FD8A7",
              300: "#7BCF85",
              400: "#5EC66A",
              500: "#40B54D",
              600: "#38A545",
              700: "#2F8F3C",
              800: "#257733",
              900: "#1C602B",
              DEFAULT: "#40B54D",
              foreground: "#FFFFFF",
            },
          },
        },

        theme_red: {
          colors: {
            background: "#2C0D0D",
            foreground: "#FFEBEE",
            content1: {
              50: "#FFEBEE",
              100: "#FFCDD2",
              200: "#EF9A9A",
              300: "#E57373",
              400: "#EF5350",
              500: "#F44336",
              600: "#E53935",
              700: "#D32F2F",
              800: "#C62828",
              900: "#B71C1C",
              DEFAULT: "#F44336",
              foreground: "#FFFFFF",
            },
          },
        },

        theme_yellow: {
          colors: {
            background: "#2E290A",
            foreground: "#FFF9C4",
            content1: {
              50: "#FFFDE7",
              100: "#FFF9C4",
              200: "#FFF59D",
              300: "#FFF176",
              400: "#FFEE58",
              500: "#FFEB3B",
              600: "#FDD835",
              700: "#FBC02D",
              800: "#F9A825",
              900: "#F57F17",
              DEFAULT: "#FFEB3B",
              foreground: "#FFFFFF",
            },
          },
        },

        theme_maroon: {
          colors: {
            background: "#180000",
            foreground: "#E6B3B6",
            content1: {
              50: "#FBE9EB",
              100: "#E6B3B6",
              200: "#D38081",
              300: "#BC4C4D",
              400: "#A6292A",
              500: "#8E0808",
              600: "#7C0707",
              700: "#690606",
              800: "#550505",
              900: "#420404",
              DEFAULT: "#8E0808",
              foreground: "#FFFFFF",
            },
          },
        },
      },
    }),
  ],
};

export default config;
