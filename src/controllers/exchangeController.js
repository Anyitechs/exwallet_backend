import { initializeDatabase } from "../queries/db.js";
import { getData } from "../queries/query.js";
import { closeOrder, createExchange, createOrder, fetchExchanges } from "../services/exchangeService.js";

export const createExchangeController = async (req, res) => {
    try {
        const { userId, offering, amount, payoutDetails } = req.body;

        if (!userId || !offering || !amount || !payoutDetails) {
            throw new Error("incomplete fields. Please fill in all the details to proceed.")
        }

        const db = await initializeDatabase();

        const customerDetails = await getData(db, userId);

        console.log('customer details: ', customerDetails)

        const exchangeDetails = { offering, amount, payoutDetails, customerCredentials: customerDetails.vc, customerDid: customerDetails.did };

        const rfq = await createExchange(exchangeDetails);

        return res.status(201).json({
            success: true,
            message: "Quote created successfully",
            data: rfq
        })


    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

export const getExchanges = async (req, res) => {
    try {
        const { userId } = req.params;

        if (!userId) {
            throw new Error("No userID specified")
        }

        const db = await initializeDatabase();

        const customerDetails = await getData(db, userId);

        const exchanges = (await fetchExchanges(customerDetails.did)).flat();

        res.status(200).json({
            success: true,
            message: 'OK',
            data: exchanges
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

export const createOrderController = async (req, res) => {
    try {
        const { userId, exchangeId, pfiUri } = req.body;

        if (!userId || !exchangeId || !pfiUri) {
            throw new Error("Incomplete fields. Fill in all fields to proceed");
        }

        const db = await initializeDatabase();

        const customerDetails = await getData(db, userId);

        const orderDetails = {
            exchangeId,
            customerDid: customerDetails.did,
            pfiUri
        }

        const order = await createOrder(orderDetails);

        res.status(201).json({
            success: true,
            message: 'Order created successfully',
            data: order
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

export const closeOrderController = async (req, res) => {
    try {
        const { userId, exchangeId, pfiUri, reason } = req.body;

        if (!userId || !exchangeId || !pfiUri || !reason) {
            throw new Error("Incomplete fields. Fill in all fields to proceed");
        }

        const db = await initializeDatabase();

        const customerDetails = await getData(db, userId);

        const orderDetails = {
            exchangeId,
            customerDid: customerDetails.did,
            pfiUri,
            reason
        }

        await closeOrder(orderDetails);

        res.status(200).json({
            success: true,
            message: 'Order closed successfully'
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}