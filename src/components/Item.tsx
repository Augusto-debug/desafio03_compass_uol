interface ItemProps {
    name: string;
    category: string;
    price: number;
    details: string;
    img: string;
  }

const Item = ({ name, category , price , details, img } : ItemProps) => {
  return (
    <div className="flex flex-col items-center justify-center p-5">
      <img src={img} alt={name} className="w-4/5 h-60 rounded-2xl object-contain" />
      <h2 className="text-lg font-bold">{name}</h2>
      <p className="text-sm text-gray-500">{category}</p>
      <p className="text-green-600 font-semibold">${price.toFixed(2)}</p>
      <p className="text-gray-700 text-xs mb-5">{details}</p>
    </div>
  )
}

export default Item