import React, { useState } from "react";
import { useUpdateAddress } from "../hooks/useAddress";
import { toast } from "react-toastify";
import { Address } from "../../../global";
import {
  Button,
  Checkbox,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import InputText from "../components/events/InputText";
import InputSelect from "../components/events/InputSelect";
import { City, Country, State } from "country-state-city";

type UpdateAddressProps = {
  isOpen: boolean;
  address: Address;
  onClose: () => void;
  onOpenChange: () => void;
};

const UpdateAddressModal = ({
  isOpen,
  onClose,
  address,
  onOpenChange,
}: UpdateAddressProps) => {
  const [addressData, setAddressData] = useState({ ...address });
  const [selectedCountryCode, setSelectedCountryCode] = useState<
    string | null
  >();
  const [selectedStateCode, setSelectedStateCode] = useState<string | null>();
  const updateAddressMutation = useUpdateAddress();

  //   const handleUpdateAddress = () => {
  //     updateAddressMutation.mutate({addressId, address}, {
  //       onSuccess: () => {
  //         toast("Address added", { type: "success" });
  //         onClose();
  //       },
  //     });
  //   };
  const handleUpdateAddress = () => {};

  return (
    <Modal
      isOpen={isOpen}
      scrollBehavior="inside"
      onOpenChange={onOpenChange}
      classNames={{
        base: "bg-[#1b1b1b] dark:bg-[#1b1b1b] text-white",
        body: "text-white",
      }}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Update Address
            </ModalHeader>
            <ModalBody>
              <InputText
                onChange={(e) =>
                  setAddressData({
                    ...addressData,
                    firstName: e.target.value,
                  })
                }
                autoFocus
                defaultValue={address.firstName}
                label="First Name"
                placeholder="Enter your First name"
              />
              <InputText
                onChange={(e) =>
                  setAddressData({
                    ...addressData,
                    lastName: e.target.value,
                  })
                }
                defaultValue={address.lastName}
                label="Last Name"
                placeholder="Enter your Last name"
              />
              <InputText
                label="Phone Number"
                type="number"
                defaultValue={String(address.phoneNumber)}
                placeholder="Enter your Phone number"
                onChange={(e) =>
                  setAddressData({
                    ...addressData,
                    phoneNumber: +e.target.value,
                  })
                }
              />

              <InputSelect
                variant="bordered"
                label="Select Gender"
                placeholder="Select your Gender"
                defaultSelectedKey={address.gender}
                options={[
                  { label: "Male", value: "male" },
                  { label: "Female", value: "female" },
                ]}
                onChange={(e) =>
                  setAddressData({
                    ...addressData,
                    gender: e.target.value as "male" | "female",
                  })
                }
              />

              <InputSelect
                variant="bordered"
                label="Select Country"
                defaultSelectedKey={address.country}
                placeholder="Select your Country"
                options={Country.getAllCountries().map((country) => {
                  return { label: country.name, value: country.isoCode };
                })}
                onChange={(e) => {
                  setSelectedCountryCode(e.target.value);
                  setAddressData({
                    ...addressData,
                    country:
                      Country.getCountryByCode(e.target.value)?.name || "",
                  });
                }}
              />

              {selectedCountryCode &&
                State.getStatesOfCountry(selectedCountryCode).length > 0 && (
                  <InputSelect
                    variant="bordered"
                    defaultSelectedKey={address.state}
                    label="Select State"
                    placeholder="Select your State"
                    options={State.getStatesOfCountry(selectedCountryCode).map(
                      (state) => {
                        return { label: state.name, value: state.isoCode };
                      },
                    )}
                    onChange={(e) => {
                      setSelectedStateCode(e.target.value);
                      setAddressData({
                        ...addressData,
                        state:
                          State.getStateByCodeAndCountry(
                            e.target.value,
                            selectedCountryCode,
                          )?.name || "",
                      });
                    }}
                  />
                )}

              {selectedStateCode &&
                City.getCitiesOfState(
                  selectedCountryCode as string,
                  selectedStateCode,
                ).length > 0 && (
                  <InputSelect
                    variant="bordered"
                    defaultSelectedKey={address.city}
                    label="Select City"
                    placeholder="Select your City"
                    options={City.getCitiesOfState(
                      selectedCountryCode as string,
                      selectedStateCode,
                    ).map((city) => {
                      return { label: city.name, value: city.name };
                    })}
                    onChange={(e) =>
                      setAddressData({ ...addressData, city: e.target.value })
                    }
                  />
                )}

              <InputText
                label="Street Address"
                defaultValue={address.street}
                placeholder="Enter your Street address"
                onChange={(e) =>
                  setAddressData({
                    ...addressData,
                    street: e.target.value,
                  })
                }
              />
              <InputText
                label="Flat Number"
                defaultValue={address.flatNumber}
                placeholder="Flat no."
                onChange={(e) =>
                  setAddressData({
                    ...addressData,
                    flatNumber: e.target.value,
                  })
                }
              />

              <Checkbox
                onChange={(e) =>
                  setAddressData({
                    ...addressData,
                    isDeliveryAddress: e.target.checked,
                  })
                }
                color="warning"
                defaultSelected={address.isDeliveryAddress}
              >
                <span className="text-sm text-yellow-500">
                  Set this as your default Address
                </span>
              </Checkbox>
            </ModalBody>
            <ModalFooter>
              <Button
                isDisabled={updateAddressMutation.isPending}
                color="danger"
                variant="solid"
                onPress={onClose}
              >
                Close
              </Button>
              <Button
                isLoading={updateAddressMutation.isPending}
                disabled={updateAddressMutation.isPending}
                color="success"
                className="text-white"
                type="submit"
                onClick={handleUpdateAddress}
              >
                {updateAddressMutation.isPending ? "Adding..." : "Add"}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default UpdateAddressModal;
