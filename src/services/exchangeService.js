import { TbdexHttpClient, Rfq, Quote, Order, OrderStatus, Close, Message } from '@tbdex/http-client';
import { DidDht } from '@web5/dids'
import { VerifiableCredential, PresentationExchange } from '@web5/credentials';

import { MOCKPFI } from '../../mockPfi.js';

export const createExchange = async (exchangeDetails) => {

    try {

        const { offering, amount, payoutDetails, customerCredentials, customerDid } = exchangeDetails;
        
        const importedDid = await DidDht.import({ portableDid: customerDid });

        const selectedCredentials = PresentationExchange.selectCredentials({
            vcJwts: customerCredentials,
            presentationDefinition: offering.data.requiredClaims
        });
    
        console.log('selected credentials: ', selectedCredentials)
    
        const rfq = Rfq.create({
            metadata: {
                from: importedDid.uri,
                to: offering.metadata.from,
                protocol: '1.0'
            },
            data: {
                offeringId: offering.metadata.id,
                payin: {
                    amount,
                    kind: offering.data.payin.methods[0].kind,
                    paymentDetails: {}
                },
                payout: {
                    kind: offering.data.payout.methods[0].kind,
                    paymentDetails: payoutDetails
                },
                claims: selectedCredentials
            }
        });

        await rfq.verifyOfferingRequirements(offering)

        await rfq.sign(importedDid);

        console.log('RFQ: ', rfq);

        await TbdexHttpClient.createExchange(rfq);

        return rfq;

    } catch (error) {
        throw new Error(error.message)
    }
}

export const fetchExchanges = async (customerDid) => {
    try {
        const importedDid = await DidDht.import({ portableDid: customerDid });

        let allExchanges = [];

        for (let index = 0; index < MOCKPFI.length; index++) {

            const exchanges = await TbdexHttpClient.getExchanges({
                pfiDid: MOCKPFI[index].did,
                did: importedDid
            });

            if (exchanges) {
                allExchanges.push(...exchanges);
            }
        }

        return allExchanges;
    } catch (error) {
        throw new Error(error.message);
    }
}

export const createOrder = async (orderDetails) => {
    try {
        const { exchangeId, customerDid, pfiUri } = orderDetails;

        const importedDid = await DidDht.import({ portableDid: customerDid });

        const order = Order.create({
            metadata: {
                from: importedDid.uri,
                to: pfiUri,
                exchangeId,
                protocol: '1.0'
            }
        });

        console.log('order created successfully: ', order)

        await order.sign(importedDid);

        console.log('order signed as well')

        await TbdexHttpClient.submitOrder(order);

        console.log('order here: ', order);
        return order;
    } catch (error) {
        throw new Error(error.message);
    }
}

export const closeOrder = async (orderDetails) => {
    try {
        const { exchangeId, customerDid, pfiUri, reason } = orderDetails;

        const importedDid = await DidDht.import({ portableDid: customerDid });

        const close = Close.create({
            metadata: {
                from: importedDid.uri,
                to: pfiUri,
                exchangeId,
                protocol: '1.0'
            },
            data: {
                reason
            }
        });

        await close.sign(importedDid);

        await TbdexHttpClient.submitClose(close);
    } catch (error) {
        throw new Error(error.message);
    }
}
