"use client";

import {
  Avatar,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  Navbar,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@nextui-org/react";
import Link from "next/link";
import { CiSearch } from "react-icons/ci";
import { getUser } from "../utils/helpers";
import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useCookies } from "next-client-cookies";

const Nav = () => {
  const [user, setUser] = useState(getUser());
  const cookies = useCookies();

  //   Setting useEffect to change navbar according to the user logged in or not
  useEffect(() => {
    function handleStorageChange() {
      setUser(getUser());
    }

    window.addEventListener("storage", handleStorageChange);

    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // Logout function
  function handleLogout() {
    toast("Logged out successfully", { type: "success" });

    // Setting the user in localstorage
    localStorage.removeItem("user");

    setUser(null);

    // Removing the cookie
    cookies.remove("token");
  }

  const navJSX = user ? (
    <Navbar isBordered>
      <NavbarContent justify="start">
        <Link href="/" className="font-bold text-inherit">
          Shop_Swift
        </Link>
      </NavbarContent>

      <NavbarContent as="div" className="items-center" justify="end">
        <Input
          classNames={{
            base: "w-[10rem] sm:w-[20rem] h-10",
            mainWrapper: "h-full",
            input: "text-small",
            inputWrapper:
              "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
          }}
          placeholder="Type to search..."
          size="sm"
          startContent={<CiSearch size={18} />}
          type="search"
        />
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Avatar
              isBordered
              as="button"
              className="transition-transform"
              color="secondary"
              name="Jason Hughes"
              size="sm"
              src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="profile" className="h-14 gap-2">
              <p className="font-semibold">Signed in as</p>
              <p className="font-semibold">hello@gmail.com</p>
            </DropdownItem>
            <DropdownItem key="settings">My Settings</DropdownItem>
            <DropdownItem
              onClick={handleLogout}
              key="logout"
              className="text-red-500"
            >
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
    </Navbar>
  ) : (
    // If the user is not logged in
    <Navbar isBordered>
      <NavbarContent className="sm:hidden">
        <Link href="/" className="font-bold text-inherit">
          Shop_Swift
        </Link>
      </NavbarContent>

      <NavbarContent className="pr-3 sm:hidden" justify="center">
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarContent className="hidden gap-4 sm:flex" justify="center">
        <Link href="/" className="font-bold text-inherit">
          Shop_Swift
        </Link>
      </NavbarContent>

      <div className="hidden sm:block">
        <NavbarContent justify="end">
          <NavbarItem>
            <Button as={Link} color="primary" href="/sign-up" variant="flat">
              Sign Up
            </Button>
          </NavbarItem>
          <NavbarItem>
            <Button as={Link} color="primary" href="/login" variant="solid">
              Login
            </Button>
          </NavbarItem>
        </NavbarContent>
      </div>

      <NavbarMenu>
        <NavbarMenuItem>
          <Link className="w-full" href="/login">
            Login
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <Link className="w-full" href="/sign-up">
            Sign-up
          </Link>
        </NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
  );

  return navJSX;
};

export default Nav;
