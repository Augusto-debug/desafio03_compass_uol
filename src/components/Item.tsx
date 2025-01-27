interface ItemProps {
    id: string | number;  // Adjust the type based on your actual data
    name: string;
    category: string;
    price: number;
    details: string;
    img: string;
  }

const Item = ({ id, name, category , price , details, img } : ItemProps) => {
  return (
    <div className="flex flex-col items-center justify-center  ">
      <img src={img} alt={name} />
      <p>{name}</p>
      <p>{category}</p>
      <p>{price}</p>
      <p>{details}</p>
    </div>
  )
}

export default Item