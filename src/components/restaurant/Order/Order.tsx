import { useState, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router";

import axios from "axios";

interface Order {
  orderName: string;
  orderPrice: number;
  orderQuantity: number;
}

const initialOrderState = {
  orderName: "",
  orderPrice: 0,
  orderQuantity: 0,
};

export const Order = () => {
  const [isOrder, setIsOrder] = useState<Order>(initialOrderState);
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  const generateRandomNumber = () => {
    const randomFraction = Math.random();

    const randomNumber = Math.floor(randomFraction * 60) + 1;

    return randomNumber;
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setIsOrder((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const sendOrder = async (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const orderTime = generateRandomNumber();

    await axios
      .post("http://localhost:8000/order/create", {
        data: {
          userId: userId,
          items: [
            {
              orderName: isOrder?.orderName,
              orderTime: orderTime,
              orderPrice: isOrder?.orderPrice,
              orderQuantity: isOrder?.orderQuantity,
            },
          ],
          totalPrice: isOrder?.orderPrice * isOrder?.orderQuantity,
        },
      })
      .then(() => {
        navigate('/restaurant');
      });
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-800 transiton duration-300">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 transiton duration-300 sm:p-8 dark:bg-gray-700 dark:rounded-md">
            <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl text-gray-900 dark:text-white">
              Create your order
            </h1>
            <form className="space-y-4 md:space-y-6">
              <div>
                <label
                  htmlFor="orderName"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Order name
                </label>
                <input
                  type="text"
                  name="orderName"
                  id="orderName"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none"
                  placeholder="Order..."
                  required
                  value={isOrder.orderName}
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <label
                  htmlFor="orderPrice"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your budget (price)
                </label>
                <input
                  type="number"
                  name="orderPrice"
                  id="orderPrice"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none"
                  placeholder="Price"
                  required
                  value={isOrder.orderPrice}
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <label
                  htmlFor="orderQuantity"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Order quantity
                </label>
                <input
                  type="number"
                  name="orderQuantity"
                  id="orderQuantity"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none"
                  placeholder="Quantity"
                  required
                  value={isOrder.orderQuantity}
                  onChange={handleInputChange}
                />
              </div>

              <span className="py-2 text-dark dark:text-white">Total payable:{isOrder?.orderPrice * isOrder?.orderQuantity}</span>

              <button
                onClick={sendOrder}
                type="button"
                className="w-full transition delay-50 border-none text-white bg-sky-400 hover:bg-sky-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 outline-none"
              >
                Order
              </button>

            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
