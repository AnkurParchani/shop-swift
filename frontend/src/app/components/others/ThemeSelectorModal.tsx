import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import React from "react";

type SelectThemeProps = {
  isOpen: boolean;
  onOpenChange: () => void;
  onClose: () => void;
};

const ThemeSelectorModal = ({
  isOpen,
  onClose,
  onOpenChange,
}: SelectThemeProps) => {
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
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Are you sure you want to delete this Address?
            </ModalHeader>
            <ModalBody>
              <p>You won&apos;t be able to recover this data</p>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="flat" onPress={onClose}>
                Close
              </Button>
              <Button color="danger" variant="solid">
                Delete
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default ThemeSelectorModal;
