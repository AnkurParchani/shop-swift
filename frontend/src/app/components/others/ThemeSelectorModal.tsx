import { useTheme } from "@/app/contexts/ThemeContext";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import React from "react";

// Main props type
type SelectThemeProps = {
  isOpen: boolean;
  onOpenChange: () => void;
  onClose: () => void;
};

// ColorSelectorType for btn
type ColorSelectorType = {
  children: React.ReactNode;
  theme: string;
  setTheme: React.Dispatch<React.SetStateAction<string>>;
  value: string;
  className: string;
};

const ThemeSelectorModal = ({
  isOpen,
  onClose,
  onOpenChange,
}: SelectThemeProps) => {
  const { theme, setTheme } = useTheme();

  const bgThemeArr = [
    { className: "bg-[#444] text-white", value: "dark" },
    { className: "bg-[#fff] text-black", value: "light" },
    {
      className: "bg-content1-foreground text-background border-2",
      value: "interface",
    },
  ];

  const interfaceThemeArr = [
    { className: "bg-purple-500", value: "purple" },
    { className: "bg-pink-600", value: "pink" },
    { className: "bg-blue-500", value: "blue" },
    { className: "bg-yellow-500", value: "yellow" },
    { className: "bg-red-500", value: "red" },
    { className: "bg-green-500", value: "green" },
    { className: "bg-red-800", value: "maroon" },
  ];

  function handleResetTheme() {
    setTheme("theme_purple-dark");
    localStorage.setItem("theme", "theme_purple-dark");
    onClose();
  }

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      classNames={{
        body: "py-2",
        base: "bg-gray-900 dark:bg-gray-900 text-[#a8b0d3]",
        closeButton: "hover:bg-white/5 active:bg-white/10",
      }}
    >
      <ModalContent>
        {() => (
          <>
            <ModalHeader>Select a Theme</ModalHeader>
            <ModalBody>
              {/* For background theme */}
              <div className="flex flex-col gap-2">
                <p>Background:</p>
                <div className="flex items-center gap-1">
                  {bgThemeArr.map((color) => (
                    <BgSelectorBtn
                      key={color.value}
                      theme={theme}
                      setTheme={setTheme}
                      className={`${color.className} capitalize`}
                      value={color.value}
                    >
                      {color.value}
                    </BgSelectorBtn>
                  ))}
                </div>
              </div>

              {/* For interface */}
              <div className="flex flex-col gap-2">
                <p>Interface:</p>
                <div className="grid grid-cols-4 items-center gap-1 sm:grid-cols-5">
                  {interfaceThemeArr.map((color) => (
                    <InterfaceSelectorBtn
                      key={color.value}
                      theme={theme}
                      setTheme={setTheme}
                      className={`${color.className} capitalize text-white`}
                      value={color.value}
                    >
                      {color.value}
                    </InterfaceSelectorBtn>
                  ))}
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button onClick={handleResetTheme} color="danger" variant="flat">
                Reset
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

// Button for bgThemeSelector
function BgSelectorBtn({
  children,
  theme,
  setTheme,
  value,
  className,
}: ColorSelectorType) {
  const bgColor = theme.split("-")[1];

  function handleThemeBgChange() {
    const newTheme = theme.split("-");
    newTheme[1] = value;
    const joinedTheme = newTheme.join("-");

    localStorage.setItem("theme", joinedTheme);
    setTheme(joinedTheme);
  }

  return (
    <div
      className={`${
        bgColor === value ? "border-yellow-500" : "border-transparent"
      } rounded-xl border-2 p-1`}
    >
      <Button className={className} onClick={handleThemeBgChange} size="sm">
        {children}
      </Button>
    </div>
  );
}

// Button for interfaceThemeSelector
function InterfaceSelectorBtn({
  children,
  theme,
  setTheme,
  value,
  className,
}: ColorSelectorType) {
  const interfaceColor = theme.split("-")[0];

  function handleThemeInterfaceChange() {
    const newTheme = theme.split("-");
    newTheme[0] = `theme_${value}`;
    const joinedTheme = newTheme.join("-");

    localStorage.setItem("theme", joinedTheme);
    setTheme(joinedTheme);
  }

  return (
    <div
      className={`${
        interfaceColor === `theme_${value}`
          ? "border-yellow-500"
          : "border-transparent"
      } mx-auto rounded-xl border-2 p-1`}
    >
      <Button
        className={className}
        onClick={handleThemeInterfaceChange}
        size="sm"
      >
        {children}
      </Button>
    </div>
  );
}

export default ThemeSelectorModal;
