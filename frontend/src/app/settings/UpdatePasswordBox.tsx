import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
} from "@nextui-org/react";
import InputPassword from "../components/events/InputPassword";
import { useTheme } from "../contexts/ThemeContext";
import { useUpdatePassword } from "../hooks/useUser";
import { useState } from "react";

const UpdatePasswordBox = () => {
  const [credentials, setCredentials] = useState({
    oldPassword: "",
    newPassword: "",
    passwordConfirm: "",
  });
  const { theme } = useTheme();
  const updatePasswordMutation = useUpdatePassword();
  const bgTheme = theme.split("-")[1];

  function handleUpdatePassword() {
    updatePasswordMutation.mutate(
      { ...credentials },
      {
        onSuccess: () =>
          setCredentials({
            newPassword: "",
            passwordConfirm: "",
            oldPassword: "",
          }),
      },
    );
  }

  return (
    <Card
      className={`relative mt-3 border-2 border-content1-500 bg-transparent sm:max-w-sm  ${
        bgTheme === "dark" ? "text-foreground" : "text-black"
      }`}
    >
      <CardHeader className="flex gap-3">Update Password</CardHeader>
      <Divider className="bg-content1-500" />
      <CardBody className="flex flex-col gap-2 text-sm capitalize">
        <InputPassword
          value={credentials.oldPassword}
          onChange={(e) =>
            setCredentials({ ...credentials, oldPassword: e.target.value })
          }
          size="sm"
          label="Old Password"
        />
        <InputPassword
          value={credentials.newPassword}
          onChange={(e) =>
            setCredentials({ ...credentials, newPassword: e.target.value })
          }
          size="sm"
          label="New Password"
        />
        <InputPassword
          value={credentials.passwordConfirm}
          onChange={(e) =>
            setCredentials({ ...credentials, passwordConfirm: e.target.value })
          }
          size="sm"
          label="Confirm Password"
        />
      </CardBody>
      <Divider className="bg-content1-500" />
      <CardFooter className="flex justify-end">
        <Button
          onClick={handleUpdatePassword}
          disabled={updatePasswordMutation.isPending}
          size="sm"
          className="bg-content1-400 text-white"
        >
          {updatePasswordMutation.isPending ? "Updating..." : "Update"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default UpdatePasswordBox;
