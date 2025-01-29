import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
interface ItemProps {
  name: string;
  category: string;
  price: number;
  details: string;
  img: string;
}

const Item = ({ name, category, price, details, img }: ItemProps) => {
  return (
    <div className="flex flex-col items-start  w-4/5 m-auto rounded-2xl bg-white justify-center p-5">
      <div className="flex justify-between items-center w-full">
        <h2 className="text-4xl mr-10 font-bold">{name}</h2>
        <div className="rounded-3xl h-full">
          <img
            src={img}
            alt={name}
            className="rounded-2xl h-44 object-contain"
          />
        </div>
      </div>
      <input
        type="button"
        className="text-lg text-green-600 font-bold my-5 ml-5"
        value="Shop now -> "
      />
    </div>
  );
};

export default Item;
