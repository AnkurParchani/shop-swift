import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Checkbox,
} from "@nextui-org/react";
import InputSelect from "../components/events/InputSelect";
import { Country, State, City } from "country-state-city";
import { useState } from "react";
import InputText from "../components/events/InputText";
import { useAddAddress } from "../hooks/useAddress";
import { toast } from "react-toastify";

type AddAddressFormType = {
  isOpen: boolean;
  onOpenChange: () => void;
  onClose: () => void;
};

const AddAddressForm = ({
  isOpen,
  onOpenChange,
  onClose,
}: AddAddressFormType) => {
  const [addressData, setAddressData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: 0,
    gender: "",
    flatNumber: "",
    country: "",
    city: "",
    state: "",
    isDeliveryAddress: false,
    street: "",
  });
  const [selectedCountryCode, setSelectedCountryCode] = useState<
    string | null
  >();
  const [selectedStateCode, setSelectedStateCode] = useState<string | null>();
  const addAddressMutation = useAddAddress();

  const handleAddAddress = () => {
    addAddressMutation.mutate(addressData, {
      onSuccess: () => {
        toast("Address added", { type: "success" });
        onClose();
      },
    });
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
              Add Address
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
                label="Last Name"
                placeholder="Enter your Last name"
              />
              <InputText
                label="Phone Number"
                type="number"
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
                options={[
                  { label: "Male", value: "male" },
                  { label: "Female", value: "female" },
                ]}
                onChange={(e) =>
                  setAddressData({
                    ...addressData,
                    gender: e.target.value,
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
                defaultSelected={false}
              >
                <span className="text-sm text-yellow-500">
                  Set this as your default Address
                </span>
              </Checkbox>
            </ModalBody>
            <ModalFooter>
              <Button
                isDisabled={addAddressMutation.isPending}
                color="danger"
                variant="solid"
                onPress={onClose}
              >
                Close
              </Button>
              <Button
                isLoading={addAddressMutation.isPending}
                disabled={addAddressMutation.isPending}
                color="success"
                className="text-white"
                type="submit"
                onClick={handleAddAddress}
              >
                {addAddressMutation.isPending ? "Adding..." : "Add"}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default AddAddressForm;
