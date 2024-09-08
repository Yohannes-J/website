// controllers/orderController.js

import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";

// Place a new order
const placeOrder = async (req, res) => {
    try {
        // Create a new order
        const newOrder = new orderModel({
            userId: req.body.userId,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address
        });

        // Save the new order to the database
        await newOrder.save();

        // Clear the user's cart after placing an order
        await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

        // Respond with success
        res.json({ success: true, message: "Order placed successfully!" });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: "Error placing order" });
    }
};

// Verify an order (e.g., after payment)
const verifyOrder = async (req, res) => {
    const { orderId, success } = req.body;
    try {
        if (success === "true") {
            // Mark the order as paid
            await orderModel.findByIdAndUpdate(orderId, { payment: true });
            res.json({ success: true, message: "Payment verified" });
        } else {
            // Delete the order if payment was not successful
            await orderModel.findByIdAndDelete(orderId);
            res.json({ success: false, message: "Payment failed, order deleted" });
        }
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: "Error verifying order" });
    }
};

// Retrieve orders for a specific user
const userOrders = async (req, res) => {
    try {
        // Find orders by user ID
        const orders = await orderModel.find({ userId: req.body.userId });
        res.json({ success: true, data: orders });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: "Error retrieving orders" });
    }
};

// List all orders
const listOrders = async (req, res) => {
    try {
        // Retrieve all orders
        const orders = await orderModel.find({});
        res.json({ success: true, data: orders });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: "Error retrieving orders" });
    }
};

// Update the status of an order
const updateStatus = async (req, res) => {
    try {
        // Update the status of the specified order
        await orderModel.findByIdAndUpdate(req.body.orderId, { status: req.body.status });
        res.json({ success: true, message: "Status updated" });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: "Error updating status" });
    }
};

// Remove an item from an order
const removeItem = async (req, res) => {
    const { orderId, itemId } = req.query; // Use query params
    try {
        // Find the order
        const order = await orderModel.findById(orderId);
        if (!order) {
            return res.json({ success: false, message: "Order not found" });
        }

        // Filter out the specific item
        order.items = order.items.filter(item => item._id.toString() !== itemId);
        await order.save();

        res.json({ success: true, message: "Item removed successfully" });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: "Error removing item" });
    }
};

// Remove an entire order
const removeOrder = async (req, res) => {
    const { orderId } = req.query; // Use query params
    try {
        // Delete the order
        await orderModel.findByIdAndDelete(orderId);
        res.json({ success: true, message: "Order removed successfully" });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: "Error removing order" });
    }
};

export { placeOrder, verifyOrder, userOrders, listOrders, updateStatus, removeItem, removeOrder };
