type ConfigurationType = {
  extraDetails: {
    colors?: { color: string; hex: string }[];
    hexColor?: string;
    maxOrderQuantity: number;
    size: string;
  };
};

const ItemConfigurations = ({ extraDetails }: ConfigurationType) => {
  const { colors, maxOrderQuantity, size } = extraDetails;

  return (
    <div className=" flex flex-col gap-2 py-4">
      <div className="flex gap-1">
        <span className="font-semibold">Colors: </span>
        {colors?.map((color) => {
          return (
            <Color
              color={color.color}
              hexColor={`bg-[${color.hex}]`}
              key={color.color}
            />
          );
        })}
      </div>

      <Sizes size={size} />
      <SelectQuantity totalQuantity={maxOrderQuantity} />
    </div>
  );
};

// Displaying the sizes available
const Sizes = ({ size }: { size: string }) => {
  const sizeArr = size.split(",");

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
    <div className="mt-1 flex items-center gap-3">
      <p className="font-semibold">Items in Stock: {totalQuantity}</p>
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
  return (
    <>
      {color && (
        <div className="py0.5 flex items-center gap-2 rounded-md border border-primary px-2 capitalize">
          <p className="font-semibold">{color}</p>
          <p className={`h-3 w-3 rounded-full ${hexColor} `} />
        </div>
      )}
    </>
  );
};

export default ItemConfigurations;
