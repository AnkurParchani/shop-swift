type ConfigurationType = {
  extraDetails: {
    color?: string;
    hexColor?: string;
    maxOrderQuantity: number;
    size: string;
  };
};

const ItemConfigurations = ({ extraDetails }: ConfigurationType) => {
  const { color, hexColor, maxOrderQuantity, size } = extraDetails;

  return (
    <div className="mb-5 flex flex-col gap-2 py-4">
      <Color color={color} hexColor={hexColor} />
      <Sizes size={size} />
      <SelectQuantity totalQuantity={maxOrderQuantity} />
    </div>
  );
};

// Displaying the sizes available
const Sizes = ({ size }: { size: string }) => {
  const sizeArr = size.split(",");
  console.log("Logging sizeArr, ", sizeArr);

  return (
    <>
      <p className="font-semibold">Sizes Available:</p>

      <div className="flex gap-2 ">
        {sizeArr.map((size) => (
          <p
            key={size}
            className="flex h-10 items-center justify-center rounded-full border border-primary bg-transparent px-3 uppercase"
          >
            {size}
          </p>
        ))}
      </div>
    </>
  );
};

// Selecting the quantity of items to be purchased
const SelectQuantity = ({ totalQuantity }: { totalQuantity: number }) => {
  return (
    <div className="mt-3 flex items-center gap-3">
      <p className="font-semibold">Quantity: </p>

      <select
        defaultValue={1}
        className="cursor-pointer rounded-md border border-primary bg-transparent px-3 py-2 text-sm"
      >
        {Array.from({ length: totalQuantity }, (_, index) => index + 1).map(
          (quantity) => (
            <option className="bg-black text-white" key={quantity}>
              {quantity}
            </option>
          ),
        )}
      </select>
    </div>
  );
};

// Determing the color of the dot dynamically
const Color = ({
  color,
  hexColor,
}: {
  color: string | undefined;
  hexColor: string | undefined;
}) => {
  let itemColor = hexColor ? `bg-[${hexColor}]` : `bg-${color}-500`;

  if (color === "black") itemColor = "bg-black";
  if (color === "white") itemColor = "bg-white";

  // The JSX
  return (
    <>
      {color && (
        <div className="flex items-center gap-2 capitalize">
          <p className="font-semibold">Color: {color} </p>
          <p className={`h-3 w-3 rounded-full ${itemColor}`} />
        </div>
      )}
    </>
  );
};

export default ItemConfigurations;
