"use client";

import Link from "next/link";
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
  useDisclosure,
} from "@nextui-org/react";
import { CiSearch } from "react-icons/ci";
import { toast } from "react-toastify";
import { useCookies } from "react-cookie";
import { usePathname, useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { useBreadcrumb } from "@/app/contexts/BreadCrumbProvider";
import { useGetUser } from "@/app/hooks/useUser";
import ThemeSelectorModal from "../others/ThemeSelectorModal";
import SearchBtn from "./SearchBtn";

const Nav = () => {
  const router = useRouter();
  let pathname = usePathname();
  const queryClient = useQueryClient();
  const [cookies, setCookie, removeCookie] = useCookies();
  const {
    isOpen: selectThemeIsOpen,
    onOpen: selectThemeOnOpen,
    onClose: selectThemeOnClose,
    onOpenChange: selectThemeOnOpenChange,
  } = useDisclosure();

  const { data: user, isLoading, error } = useGetUser();
  const { setPrevPages } = useBreadcrumb();

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
            <DropdownTrigger>
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
            </DropdownTrigger>

            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem key="profile" className="h-14 gap-2">
                <p className="font-semibold">Signed in as</p>
                <p className="font-semibold">{user.email}</p>
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
                My Cart
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
        <NavbarContent className="sm:hidden">
          <Link href="/" className="font-bold text-inherit text-white">
            Shop_Swift
          </Link>
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
            <NavbarMenuItem
              onClick={selectThemeOnOpen}
              key="changeTheme"
              className="cursor-pointer text-white"
            >
              <p className="rounded-md bg-green-500 px-3 py-2 text-sm">
                Change Theme
              </p>
            </NavbarMenuItem>
          </NavbarContent>
        </div>

        <NavbarMenu className="bg-[#333] text-white">
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
          <NavbarMenuItem key="changeTheme" onClick={selectThemeOnOpen}>
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
