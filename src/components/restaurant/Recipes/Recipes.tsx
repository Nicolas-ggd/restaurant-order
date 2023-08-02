import { useParams } from "react-router";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";

import { Header } from "../../header/Header";

interface OrderItem {
  orderName: string;
  orderTime: number;
  price: number;
  quantity: number;
  _id: string;
  orderRecipes: [];
}

interface Order {
  totalPrice: number;
  _id: string;
  items: OrderItem[];
}

export const Recipes: React.FC = () => {
  const Recipies = useParams<{ id: string }>();
  const [isOrder, setIsOrder] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSearch, setIsSearch] = React.useState<string>('');

  useEffect(() => {
    setIsLoading(true);
    if (Recipies?.id) {
      const orderRecipies = async () => {
        await axios
          .get(`${process.env.REACT_APP_API_URL}/order/get-one-order`, {
            params: {
              orderId: Recipies?.id,
            },
          })
          .then((res) => {
            const data = res.data;
            setIsOrder([data]);
            setIsLoading(false);
          });
      };

      orderRecipies();
    }
  }, [Recipies]);

  return (
    <div className="w-full h-screen dark:bg-gray-900 transition duration-300">
      <Header isSearch={isSearch} setIsSearch={setIsSearch} />
      <div className="w-full h-screen">
        <div className="flex items-center justify-center w-full h-screen">
          {!isLoading &&
            isOrder.map((order, index) => {
              return order?.items?.map((item, subIndex) => (
                <div
                  key={`${index}-${subIndex}`}
                  className=" p-4 text-center transition duration-300 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700"
                >
                  <div className="flex justify-center items-center">
                    <div className="rounded-xl bg-green-500 w-3 h-3 mx-2"></div>
                    <p className="dark:text-white">Your order is active</p>
                  </div>
                  <h5 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">
                    {item?.orderName}
                  </h5>
                  <p className="mb-5 text-base text-gray-500 sm:text-lg dark:text-gray-400">
                    {item?.orderRecipes.join(", ")}
                  </p>
                  <div className="items-center justify-center space-y-4 sm:flex sm:space-y-0 sm:space-x-4">
                    <span className="dark:text-white">
                      Your order will be ready: {item?.orderTime}min
                    </span>
                  </div>
                  <div className="items-center justify-center space-y-4 sm:flex sm:space-y-0 sm:space-x-4">
                    <span className="dark:text-white bg-gray-300 p-2 rounded-xl">
                      Order total price: {item?.price}$
                    </span>
                  </div>

                  <div className="items-center py-4 justify-center space-y-4 sm:flex sm:space-y-0 sm:space-x-4">
                    <Link
                      to="/restaurant"
                      className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      Back to order list
                    </Link>
                  </div>
                </div>
              ));
            })}
          {isLoading && <span className="dark:text-white">Loading...</span>}
        </div>
      </div>
    </div>
  );
};
