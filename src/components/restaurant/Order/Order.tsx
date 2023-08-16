import { useState, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router";

import axios from "axios";

import { Header } from "../../header/Header";

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
  const [isRecipes, setIsRecipes] = useState<string>("");
  const [isSearch, setIsSearch] = useState<string>("");
  const [orderRecipies, setOrderRecipies] = useState<string[]>([]);
  const [isError, setIsError] = useState<boolean>(false);
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

  const sendOrder = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const orderTime = generateRandomNumber();

    if (
      isOrder?.orderName.length === 0 ||
      isOrder?.orderPrice === 0 ||
      isOrder?.orderQuantity === 0 ||
      orderRecipies?.length === 0
    ) {
      return setIsError(true);
    }

    await axios
      .post(`https://restaurant-order-4hbo.onrender.com/order/create`, {
        data: {
          userId: userId,
          items: [
            {
              orderName: isOrder?.orderName,
              orderTime: orderTime,
              orderPrice: isOrder?.orderPrice,
              orderQuantity: isOrder?.orderQuantity,
              orderRecipies: orderRecipies,
            },
          ],
          totalPrice: isOrder?.orderPrice * isOrder?.orderQuantity,
        },
      })
      .then(() => {
        navigate("/restaurant");
      });
  };

  const handleRecipies = (e: ChangeEvent<HTMLInputElement>) => {
    setIsRecipes(e.target.value);
  };

  const addRecipies = async (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (isRecipes.trim() === "") {
      return;
    }

    setOrderRecipies((prevRecipes) => [...prevRecipes, isRecipes]);
    setIsRecipes("");
  };

  return (
    <>
      <Header isSearch={isSearch} setIsSearch={setIsSearch} />
      <div className="bg-gray-50 dark:bg-gray-900 transition duration-300 h-screen">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 h-full">
          <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
            <div className="p-6 space-y-4 md:space-y-6 transition duration-300 sm:p-8 dark:bg-gray-800 dark:rounded-md">
              <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl text-gray-900 dark:text-white">
                Create your order
              </h1>
              <form className="space-y-4 md:space-y-6" onSubmit={sendOrder}>
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
                    style={{
                      borderColor:
                        isError && isOrder?.orderName?.length === 0
                          ? "red"
                          : "",
                    }}
                    value={isOrder.orderName}
                    onChange={handleInputChange}
                  />
                  {isError && isOrder?.orderName?.length === 0 && (
                    <span className="text-red-600">Please fill order name</span>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="orderName"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Recipes
                  </label>
                  <div className="flex">
                    <input
                      type="text"
                      name="Recipes"
                      id="Recipes"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none"
                      placeholder="Recipes..."
                      value={isRecipes}
                      onChange={handleRecipies}
                      style={{
                        borderColor:
                          isError && orderRecipies?.length === 0 ? "red" : "",
                      }}
                    />
                    <button
                      onClick={addRecipies}
                      type="button"
                      className="mx-2 transition delay-50 border-none text-white bg-sky-400 hover:bg-sky-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 outline-none"
                    >
                      Add
                    </button>
                  </div>

                  <div className="flex flex-col">
                    {isError && orderRecipies?.length === 0 && (
                      <span className="text-red-600">
                        Please add some recipies
                      </span>
                    )}
                    <span className="text-dark dark:text-white py-2">
                      current recipes: {orderRecipies.join(", ")}
                    </span>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="orderPrice"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Price
                  </label>
                  <input
                    type="number"
                    name="orderPrice"
                    id="orderPrice"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none"
                    placeholder="Price"
                    value={isOrder.orderPrice}
                    onChange={handleInputChange}
                    style={{
                      borderColor:
                        isError && isOrder?.orderPrice === 0 ? "red" : "",
                    }}
                  />
                  {isError && isOrder?.orderPrice === 0 && (
                    <span className="text-red-600">
                      Please specify the desired price
                    </span>
                  )}
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
                    value={isOrder.orderQuantity}
                    onChange={handleInputChange}
                    style={{
                      borderColor:
                        isError && isOrder?.orderQuantity === 0 ? "red" : "",
                    }}
                  />
                  {isError && isOrder?.orderQuantity === 0 && (
                    <span className="text-red-600">
                      Please specify the desired order quantity
                    </span>
                  )}
                </div>

                <span className="py-2 text-dark dark:text-white">
                  Total payable: {isOrder?.orderPrice * isOrder?.orderQuantity}
                </span>

                <button
                  type="submit"
                  className="w-full transition delay-50 border-none text-white bg-sky-400 hover:bg-sky-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 outline-none"
                >
                  Order
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
