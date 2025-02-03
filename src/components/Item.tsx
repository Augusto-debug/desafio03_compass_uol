interface ItemProps {
  name: string;
  category: string;
  price: number;
  details: string;
  img: string;
}

const Item = ({ name, category, price, details, img }: ItemProps) => {
  return (
    <div className="flex flex-col items-start cursor-pointer w-4/5 m-auto rounded-2xl bg-white justify-center p-5">
      <div className="flex justify-between items-center w-full">
        <h2 className="font-medium ">{name}</h2>
        <div className="rounded-3xl h-full">
          <img
            src={img}
            alt={name}
            className="rounded-2xl h-44 w-full object-cover"
          />
        </div>
      </div>
      <input
        type="button"
        className="text-lg text-green-600 font-bold my-5 ml-5 cursor-pointer"
        value="Shop now -> "
      />
    </div>
  );
};

export default Item;
