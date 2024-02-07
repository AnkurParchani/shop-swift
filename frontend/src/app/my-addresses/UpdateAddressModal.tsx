import React, { useEffect, useState } from "react";
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
  const updateAddressMutation = useUpdateAddress();
  const [addressData, setAddressData] = useState({ ...address });
  const selectedCountry = Country.getAllCountries().find(
    (country) => country.name === addressData.country,
  );
  const selectedState = State.getStatesOfCountry(selectedCountry?.isoCode).find(
    (state) => state.name === addressData.state,
  );
  const [selectedCountryCode, setSelectedCountryCode] = useState<
    string | undefined
  >(selectedCountry?.isoCode);
  const [selectedStateCode, setSelectedStateCode] = useState<
    string | undefined
  >(selectedState?.isoCode);

  const handleUpdateAddress = () => {
    updateAddressMutation.mutate(
      { addressId: addressData.id, address: addressData },
      {
        onSuccess: () => {
          toast("Your address has been updated", { type: "success" });
          onClose();
        },
      },
    );
  };

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
                defaultValue={addressData.firstName}
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
                defaultValue={addressData.lastName}
                label="Last Name"
                placeholder="Enter your Last name"
              />

              <InputText
                label="Phone Number"
                type="number"
                defaultValue={String(addressData.phoneNumber)}
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
                defaultSelectedKey={addressData.gender}
                placeholder="Select your Gender"
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
                placeholder="Select your Country"
                options={Country.getAllCountries().map((country) => {
                  return { label: country.name, value: country.isoCode };
                })}
                defaultSelectedKey={selectedCountry?.isoCode}
                onChange={(e) => {
                  setSelectedCountryCode(e.target.value);
                  setAddressData({
                    ...addressData,
                    country:
                      Country.getCountryByCode(e.target.value)?.name || "",
                  });
                }}
              />

              {selectedCountry &&
                selectedCountryCode &&
                State.getStatesOfCountry(selectedCountryCode).length > 0 && (
                  <InputSelect
                    variant="bordered"
                    label="Select State"
                    defaultSelectedKey={selectedStateCode}
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
                    label="Select City"
                    defaultSelectedKey={addressData.city}
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
                defaultValue={addressData.street}
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
                defaultValue={addressData.flatNumber}
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
                defaultSelected={addressData.isDeliveryAddress}
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
                {updateAddressMutation.isPending ? "Updating..." : "Update"}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default UpdateAddressModal;
