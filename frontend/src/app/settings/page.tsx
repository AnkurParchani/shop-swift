"use client";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  useDisclosure,
} from "@nextui-org/react";

import BreadCrumb from "../components/others/BreadCrumb";
import Loading from "../loading";
import Image from "next/image";
import DeleteAccountModal from "./DeleteAccountModal";
import UpdatePasswordBox from "./UpdatePasswordBox";

import { useTheme } from "../contexts/ThemeContext";
import { useGetUser } from "../hooks/useUser";

const Page = () => {
  const { theme } = useTheme();
  const bgTheme = theme.split("-")[1];
  const { data: user, error, isLoading } = useGetUser();
  const {
    isOpen: deleteAccountIsOpen,
    onOpen: deleteAccountOnOpen,
    onClose: deleteAccountOnClose,
    onOpenChange: deleteAccountOnOpenChange,
  } = useDisclosure();

  if (isLoading) <Loading />;
  if (!user) return <p>Login first</p>;

  return (
    <>
      <div className={`mx-auto flex max-w-5xl flex-col gap-2 px-5 py-5`}>
        <BreadCrumb curPage="Account" />

        <p className="flex items-center gap-1 text-lg font-semibold text-content1-400">
          Settings
        </p>

        <div className="relative flex flex-col gap-1 text-center">
          <Image
            src={user.image?.path || "/images/default-user.jpg"}
            alt="User-Img"
            className="m-auto h-20 w-auto cursor-pointer rounded-full"
            height={1000}
            width={1000}
          />
          <p className="capitalize">{user.name}</p>
          <p className="-mt-1 text-xs">({user.email})</p>
        </div>

        <UpdatePasswordBox />

        <Card
          className={`relative mt-3 border-2 border-red-500 bg-transparent  ${
            bgTheme === "dark" ? "text-foreground" : "text-black"
          }`}
        >
          <CardHeader className="flex gap-3">Delete Account</CardHeader>
          <Divider className="bg-red-500" />
          <CardBody className="flex flex-col gap-2 text-sm ">
            <p>You will NOT be able to retrieve any of your data</p>
          </CardBody>
          <Divider className="bg-red-500" />
          <CardFooter className="flex justify-end">
            <Button
              size="sm"
              className="bg-red-400 text-white"
              onClick={deleteAccountOnOpen}
            >
              Delete
            </Button>
          </CardFooter>
        </Card>
      </div>

      {deleteAccountIsOpen && (
        <DeleteAccountModal
          isOpen={deleteAccountIsOpen}
          onClose={deleteAccountOnClose}
          onOpenChange={deleteAccountOnOpenChange}
        />
      )}
    </>
  );
};

export default Page;
