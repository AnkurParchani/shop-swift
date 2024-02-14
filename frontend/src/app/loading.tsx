"use client";

import { Spinner } from "@nextui-org/react";
import { useTheme } from "./contexts/ThemeContext";

import Footer from "./components/others/Footer";
import { useEffect, useState } from "react";

export default function Loading({ label }: { label?: string }) {
  const [defaultLoadingText, setDefaultLoadingText] = useState("Loading...");
  const { theme } = useTheme();
  const bgTheme = theme.split("-")[1];
  const color = theme.split("-")[0];
  let spinnerColor;

  // Changing the text according to time of the loading
  useEffect(() => {
    setTimeout(() => {
      setDefaultLoadingText("Apologies for the delay...");
    }, 3000);

    setTimeout(() => {
      setDefaultLoadingText("Almost there, thank you for your patience...");
    }, 8000);

    setTimeout(() => {
      setDefaultLoadingText(
        "Our server is currently undergoing maintenance. It will be back up shortly. Please bear with us, this may take anywhere from one to five minutes.",
      );
    }, 15000);
  }, []);

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
          className={`px-4 text-center ${
            bgTheme === "dark" ? "text-foreground" : "text-black"
          }`}
        >
          {label || defaultLoadingText}
        </p>
      </div>
      <Footer />
    </>
  );
}
