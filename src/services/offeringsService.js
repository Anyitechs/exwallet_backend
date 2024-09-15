import { TbdexHttpClient, Rfq, Quote, Order, OrderStatus, Close, Message } from '@tbdex/http-client';

import { MOCKPFI } from '../../mockPfi.js';

export const getOfferings = async () => {
    let pfiOfferings = [];
    try {
        for (let pfi = 0; pfi < MOCKPFI.length; pfi++) {
            let index = pfi;

            const offerings = await TbdexHttpClient.getOfferings({
                pfiDid: MOCKPFI[index].did
            });            

            if (offerings) {
                pfiOfferings.push(...offerings);
            }
        }
        
        return pfiOfferings;
    } catch (error) {
        console.log('error here: ', error);
    }
}

