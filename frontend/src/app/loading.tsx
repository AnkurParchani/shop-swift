"use client";

import { Spinner } from "@nextui-org/react";
import { useTheme } from "./contexts/ThemeContext";

import Footer from "./components/others/Footer";

export default function Loading({ label }: { label?: string }) {
  const { theme } = useTheme();
  const bgTheme = theme.split("-")[1];
  const color = theme.split("-")[0];
  let spinnerColor;

  // Changing the color of the spinner according to the selected theme
  switch (color) {
    case "theme_purple":
      spinnerColor = "secondary";
      break;
    case "theme_yellow":
      spinnerColor = "warning";
      break;
    case "theme_red":
      spinnerColor = "danger";
      break;
    case "theme_maroon":
      spinnerColor = "danger";
      break;
    case "theme_green":
      spinnerColor = "success";
      break;
    case "theme_blue":
      spinnerColor = "primary";
      break;

    default:
      spinnerColor = "default";
      break;
  }

  return (
    <>
      <div className="mt-20 flex min-h-72 flex-col items-center gap-5">
        {/* @ts-ignore */}
        <Spinner size="lg" color={spinnerColor} />
        <p
          className={`text-center ${
            bgTheme === "dark" ? "text-foreground" : "text-black"
          }`}
        >
          {label || "Loading..."}
        </p>
      </div>
      <Footer />
    </>
  );
}
