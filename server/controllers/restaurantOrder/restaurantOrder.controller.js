const Order = require('../../models/RestaurantOrder');

const CreateOrder = async (req, res) => {
    const orderDetails = req.body.data;

    try {
        const orderCreated = await Order.create(
            {
                user: orderDetails.userId,
                items: [{
                    orderName: orderDetails.items[0].orderName,
                    orderTime: orderDetails.items[0].orderTime,
                    price: orderDetails.items[0].orderPrice,
                    quantity: orderDetails.items[0].orderQuantity,
                    orderRecipes: orderDetails.items[0].orderRecipies
                }],
                totalPrice: orderDetails.totalPrice
            }
        )

        return res.status(200).json(orderCreated);

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Can't create orders" })
    }
};

const getOrders = async (req, res) => {
    const userId = req.query.userId;

    try {
        const userOrder = await Order.find({
            $and: [
                { 'user': userId }
            ]
        })
            .populate('user', 'name')
            .exec()

        return res.status(200).json(userOrder);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Can't get orders" });
    }
};

const deleteOrder = async (req, res) => {
    const { orderId } = req.body;
    console.log(orderId);
  
    try {
      const orderDeleted = await Order.findOneAndDelete({ _id: orderId });
      console.log(orderDeleted);
  
      return res.status(200).json(orderDeleted);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Can't delete order" });
    }
  };


module.exports = {
    CreateOrder,
    getOrders,
    deleteOrder
};