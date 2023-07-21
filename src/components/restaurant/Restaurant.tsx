import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import axios from "axios";

import { Header } from "../header/Header";
import DeleteIcon from "@mui/icons-material/Delete";

interface OrderItem {
  orderName: string;
  orderTime: number;
  price: number;
  quantity: number;
  _id: string;
}

interface Order {
  totalPrice: number,
  _id: string;
  items: OrderItem[];
}

export const Restaurant: React.FC = () => {
  const [isOrder, setIsOrder] = useState<Order[]>([]);
  const userId = localStorage.getItem("userId");

  const userOrders = async () => {
    await axios
      .get("http://localhost:8000/order/get-order", {
        params: {
          userId: userId,
        },
      })
      .then((res) => {
        const data = res.data;
        setIsOrder(data);
      });
  };

  useEffect(() => {
    userOrders();
  }, [userId]);

  const deleteOrder = async (orderId: string) => {
    console.log(orderId)
    await axios
      .post("http://localhost:8000/order/delete-order", {
          orderId: orderId,
      })
      .then(() => {
        userOrders();
      });
  };

  return (
    <>
      <Header />
      <div className="w-full h-screen py-40 dark:bg-gray-900 transition duration-300">
        <div className="w-full flex justify-center">
          <Link
            to="/restaurant/order"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full transition duration-200"
          >
            Order
          </Link>
        </div>

        <div className="w-full px-5 sm:px-10 h-full transition duration-300 bg-white py-10 dark:bg-gray-900">
          <div className="flex flex-wrap justify-center">
            {isOrder?.map((order, index) => {
              return order.items.map((item, itemIndex) => (
                <div
                  key={`${index}-${itemIndex}`}
                  style={{ width: "100%", maxWidth: "320px" }}
                  className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-4 relative"
                >
                  <div className="max-w-md h-80 m-auto p-6 hover:scale-110 cursor-pointer transition duration-300 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                    <div className="w-full flex justify-end">
                      <DeleteIcon
                        onClick={() => deleteOrder(order?._id)}
                        className="dark:text-white absoulte w-full h-full"
                      />
                    </div>
                    <div className="flex items-center pt-3">
                      <div className="px-3">
                        <h5 className="mb-2 text-lg md:text-xl font-sans transition duration-300 tracking-tight text-gray-900 dark:text-white">
                          {item?.orderName}
                        </h5>
                      </div>
                    </div>
                    <p className="flex font-sm flex-wrap my-5 dark:text-white px-3">
                      Your order will be ready: {item?.orderTime}min
                    </p>
                    <p className="flex font-sm flex-wrap my-5 dark:text-white px-3">
                      Total price: {order?.totalPrice}$
                    </p>
                    <div className="w-full py-4 flex justify-center">
                      <button
                        type="button"
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      >
                        Cook this
                      </button>
                    </div>
                  </div>
                </div>
              ));
            })}
          </div>
        </div>
      </div>
    </>
  );
};
