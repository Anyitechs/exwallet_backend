import { getOfferings } from "../services/offeringsService.js";

export const getOfferingsController = async (req, res) => {
    try {
        const offerings = await getOfferings();

        if (offerings) {
            return res.status(200).json({
                success: true,
                message: 'OK',
                offerings
            });
        }

        return res.status(500).json({
            success: false,
            message: 'Get Offerings failed',
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}