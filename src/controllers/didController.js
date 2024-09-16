import { initializeDatabase } from "../queries/db.js";
import { getData, saveData, getAllUserData } from "../queries/query.js";
import { createDid, createVC } from "../services/didService.js";

export const createVcController = async (req, res) => {
    try {
        const db = await initializeDatabase();

        const { customerName, countryCode } = req.body;

        if (!customerName && !countryCode) {
            throw new Error('Customer name and country code is required.');
        }

        const customerDID = await createDid();

        const customerVC = await createVC(customerName, countryCode, customerDID);

        const userId = await saveData(db, customerDID, customerVC);

        if (!userId) {
            return res.status(500).json({
                success: false,
                message: 'Unable to save user record. Please try again.',
            });
        }

        return res.status(201).json({
            success: true,
            message: 'Record created',
            data: {
                id: userId,
                did: customerDID,
                vc: customerVC
            }
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

export const getVcController = async (req, res) => {
    try {
        const { userId } = req.params;

        if (!userId) {
            throw new Error('The User ID must be provided.')
        }

        console.log('user id here: ', userId)


        const db = await initializeDatabase();
    
        const data = await getData(db, userId);

        if (!data) {
            return res.status(500).json({
                success: false,
                message: "Failed to fetch user record"
            });
        }
    
        return res.status(200).json({
            success: true,
            message: 'OK',
            data
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

export const getAllVcController = async (req, res) => {
    try {
        // const { userId } = req.params;

        // if (!userId) {
        //     throw new Error('The User ID must be provided.')
        // }

        // console.log('user id here: ', userId)


        const db = await initializeDatabase();
    
        const data = await getAllUserData(db);

        if (!data) {
            return res.status(500).json({
                success: false,
                message: "Failed to fetch user record"
            });
        }
    
        return res.status(200).json({
            success: true,
            message: 'OK',
            data
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}