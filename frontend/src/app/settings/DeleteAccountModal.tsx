import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Textarea,
} from "@nextui-org/react";
import { useDeleteMyAccount, useGetUser } from "../hooks/useUser";
import { useRouter } from "next/navigation";
import { useState } from "react";
import InputText from "../components/events/InputText";
import InputPassword from "../components/events/InputPassword";

type UpdateReviewProps = {
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: () => void;
};

const DeleteAccountModal = ({
  isOpen,
  onClose,
  onOpenChange,
}: UpdateReviewProps) => {
  const router = useRouter();
  const [deleteConfirmation, setDeleteConfirmation] = useState<string>("");
  const [password, setPassword] = useState("");
  const { data: user } = useGetUser();
  const deleteAccountMutation = useDeleteMyAccount();
  const userName = user && user.name.split(" ").join("");
  const isConfirmed = deleteConfirmation === `${userName}/delete-my-account`;

  function handleDeleteAccount() {
    if (!isConfirmed) return;

    deleteAccountMutation.mutate(
      { password, confirmation: true },
      {
        onSuccess: () => {
          router.push("/");
          onClose()
        },
      },
    );
  }

  return (
    <Modal
      isOpen={isOpen}
      scrollBehavior="inside"
      onOpenChange={onOpenChange}
      classNames={{
        body: "py-2",
        closeButton: "hover:bg-white/5 active:bg-white/10",
      }}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Delete Account
            </ModalHeader>
            <ModalBody className="text-sm">
              <p>
                Type &quot;
                <span className="text-red-400">
                  {userName}/delete-my-account
                </span>
                &quot; for confirmation
              </p>

              <InputText
                label="Confirmation box"
                onChange={(e) => setDeleteConfirmation(e.target.value)}
              />

              <p>Enter your password</p>
              <InputPassword
                label="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </ModalBody>
            <ModalFooter>
              <Button
                size="sm"
                isDisabled={deleteAccountMutation.isPending}
                color="danger"
                variant="solid"
                onPress={onClose}
              >
                Close
              </Button>
              <Button
                size="sm"
                isLoading={deleteAccountMutation.isPending}
                disabled={deleteAccountMutation.isPending || !isConfirmed}
                color={isConfirmed ? "success" : "default"}
                className="text-black"
                type="submit"
                onClick={handleDeleteAccount}
              >
                {deleteAccountMutation.isPending ? "Deleting..." : "Delete"}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default DeleteAccountModal;
