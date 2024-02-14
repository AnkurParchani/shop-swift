"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Avatar,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Navbar,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
  useDisclosure,
} from "@nextui-org/react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { usePathname, useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";

import ThemeSelectorModal from "../others/ThemeSelectorModal";
import SearchBtn from "./SearchBtn";

import { useBreadcrumb } from "@/app/contexts/BreadCrumbProvider";
import { useGetUser } from "@/app/hooks/useUser";
import { useTheme } from "@/app/contexts/ThemeContext";
import { useGetMyCart } from "@/app/hooks/useCart";

const Nav = () => {
  const router = useRouter();
  const navigate = useNavigate();
  let pathname = usePathname();

  const { theme } = useTheme();
  const [itemsInCart, setItemsInCart] = useState();
  const bgTheme = theme.split("-")[1];
  const queryClient = useQueryClient();
  const [cookies, setCookie, removeCookie] = useCookies();
  const { data: cart, isLoading: cartIsLoading } = useGetMyCart();
  const { data: user } = useGetUser();

  const {
    isOpen: selectThemeIsOpen,
    onOpen: selectThemeOnOpen,
    onClose: selectThemeOnClose,
    onOpenChange: selectThemeOnOpenChange,
  } = useDisclosure();

  const { setPrevPages } = useBreadcrumb();

  useEffect(() => {
    if (cart) {
      setItemsInCart(cart.length);
    }
  }, [cart, cart?.length, cartIsLoading]);

  let label: string;
  switch (pathname) {
    case "/my-cart":
      label = "Cart";
      break;
    case "/pricing":
      label = "Pricing";
      break;
    case "/my-orders":
      label = "Orders";
      break;
    case "/my-reviews":
      label = "Reviews";
      break;
    case "/my-wishlist":
      label = "Wishlist";
      break;
    case "/my-addresses":
      label = "Addresses";
      break;

    default:
      label = "Home";
      break;
  }

  if (label === "Home") pathname = "/";

  // Logout function
  function handleLogout() {
    toast("Logged out successfully", { type: "success" });
    // Setting the user in localstorage
    localStorage.removeItem("user");

    // Invalidating all the essential tags
    queryClient.invalidateQueries({ queryKey: ["user"] });
    queryClient.invalidateQueries({ queryKey: ["my-wishlist"] });

    // Removing the cookie
    removeCookie("token");

    navigate("/");
    location.reload();
  }

  const navJSX = user ? (
    <>
      <Navbar isBordered>
        <NavbarContent justify="start">
          <Link href="/" className="font-bold text-inherit text-white">
            Shop_Swift
          </Link>
        </NavbarContent>

        <NavbarContent as="div" className="items-center" justify="end">
          <SearchBtn />
          <Dropdown placement="bottom-end">
            <DropdownTrigger className="relative">
              <div>
                <Avatar
                  isBordered
                  as="button"
                  className="transition-transform"
                  color="secondary"
                  name="Jason Hughes"
                  size="sm"
                  src={`${
                    user.image?.path
                      ? user.image.path
                      : "/images/default-user.jpg"
                  }`}
                />
                {itemsInCart && (
                  <p className="absolute -bottom-1 -right-1 rounded-full bg-red-500 px-1 text-xs text-white">
                    {itemsInCart}
                  </p>
                )}
              </div>
            </DropdownTrigger>

            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem key="profile" className="h-14 gap-2">
                <p className="font-semibold">Signed in as</p>
                <p className="font-semibold">{user.email}</p>
              </DropdownItem>
              <DropdownItem
                onClick={() => {
                  router.push("/");
                  if (pathname !== "/") {
                    setPrevPages([{ label, link: pathname }]);
                  }
                }}
                key="home"
              >
                Home
              </DropdownItem>
              <DropdownItem
                onClick={() => {
                  router.push("/my-cart");
                  if (pathname !== "/my-cart") {
                    setPrevPages([{ label, link: pathname }]);
                  }
                }}
                key="cart"
              >
                {/* My Cart */}
                <div className="flex items-center justify-between">
                  <p>My Cart</p>
                  {itemsInCart && (
                    <p className="rounded-full bg-red-500 px-2 text-[12px] text-white">
                      {itemsInCart}
                    </p>
                  )}
                </div>
              </DropdownItem>
              <DropdownItem
                onClick={() => {
                  router.push("/my-wishlist");
                  if (pathname !== "/my-wishlist") {
                    setPrevPages([{ label, link: pathname }]);
                  }
                }}
                key="wishlist"
              >
                My Wishlist
              </DropdownItem>
              <DropdownItem
                onClick={() => {
                  router.push("/my-addresses");
                  if (pathname !== "/my-addresses") {
                    setPrevPages([{ label, link: pathname }]);
                  }
                }}
                key="address"
              >
                My Addresses
              </DropdownItem>
              <DropdownItem
                onClick={() => {
                  router.push("/my-orders");
                  if (pathname !== "/my-orders") {
                    setPrevPages([{ label, link: pathname }]);
                  }
                }}
                key="orders"
              >
                My Orders
              </DropdownItem>
              <DropdownItem
                onClick={() => {
                  router.push("/my-reviews");
                  if (pathname !== "/my-reviews") {
                    setPrevPages([{ label, link: pathname }]);
                  }
                }}
                key="reviews"
              >
                My Reviews
              </DropdownItem>
              <DropdownItem key="theme" onClick={selectThemeOnOpen}>
                <div className="flex items-center justify-between rounded-md bg-green-500 px-1.5 py-2 text-white">
                  <p>Change Theme</p>
                  <div>
                    <p className="rounded-lg bg-red-500 px-1.5 text-[10px] text-white">
                      HOT
                    </p>
                  </div>
                </div>
              </DropdownItem>

              <DropdownItem
                key="settings"
                className="-mt-2"
                onClick={() => router.push("/settings")}
              >
                <p className="rounded-md bg-yellow-600 px-1.5 py-2 text-center text-white">
                  Settings
                </p>
              </DropdownItem>
              <DropdownItem
                className="-mt-2"
                key="logout"
                onClick={handleLogout}
              >
                <p className=" rounded-md bg-red-500 px-1.5 py-2 text-center text-white">
                  Logout
                </p>
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarContent>
      </Navbar>

      {/* When changing theme modal is open */}
      {selectThemeIsOpen && (
        <ThemeSelectorModal
          isOpen={selectThemeIsOpen}
          onClose={selectThemeOnClose}
          onOpenChange={selectThemeOnOpenChange}
        />
      )}
    </>
  ) : (
    // If the user is not logged in
    <>
      <Navbar isBordered>
        <NavbarContent>
          <Link href="/" className="font-bold text-inherit text-white">
            Shop_Swift
          </Link>
        </NavbarContent>

        <NavbarContent className="pr-3 sm:hidden" justify="center">
          <SearchBtn />
          <NavbarMenuToggle />
        </NavbarContent>

        <NavbarMenu
          className={`max-h-40 border-b-3 border-gray-300 bg-transparent  sm:hidden ${
            bgTheme === "dark" ? "text-white" : "text-black"
          }`}
        >
          <NavbarMenuItem className="mt-2">
            <Link className="w-full" href="/login">
              Login
            </Link>
          </NavbarMenuItem>
          <NavbarMenuItem className="mt-2">
            <Link className="w-full" href="/sign-up">
              Sign-up
            </Link>
          </NavbarMenuItem>
          <NavbarMenuItem
            className="mt-2 cursor-pointer"
            key="changeTheme"
            onClick={selectThemeOnOpen}
          >
            <div className="flex items-center justify-between text-base text-green-500">
              <p>Change Theme</p>
              <div>
                <p className="rounded-lg bg-red-500 px-1.5 text-[10px] text-white">
                  HOT
                </p>
              </div>
            </div>
          </NavbarMenuItem>
        </NavbarMenu>

        <div className="hidden max-h-20 sm:block">
          <NavbarContent justify="end" className="flex gap-2.5">
            <SearchBtn />
            <NavbarMenuItem
              onClick={selectThemeOnOpen}
              key="changeTheme"
              className="cursor-pointer text-white"
            >
              <p className="rounded-md bg-green-500 px-2 py-2 text-sm">
                Change Theme
              </p>
            </NavbarMenuItem>
            <NavbarItem>
              <Button
                radius="sm"
                as={Link}
                className={`border border-content1-500 bg-transparent text-white`}
                href="/sign-up"
                variant="flat"
              >
                Sign Up
              </Button>
            </NavbarItem>
            <NavbarItem>
              <Button
                radius="sm"
                as={Link}
                className="bg-content1-500 text-white"
                href="/login"
                variant="solid"
              >
                Login
              </Button>
            </NavbarItem>
          </NavbarContent>
        </div>
      </Navbar>

      {/* When changing theme modal is open */}
      {selectThemeIsOpen && (
        <ThemeSelectorModal
          isOpen={selectThemeIsOpen}
          onClose={selectThemeOnClose}
          onOpenChange={selectThemeOnOpenChange}
        />
      )}
    </>
  );

  return navJSX;
};

export default Nav;
