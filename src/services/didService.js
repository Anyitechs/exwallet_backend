import { DidDht } from '@web5/dids'
import axios from 'axios'

export const createDid = async () => {
    const didDht = await DidDht.create({ options: { publish: true } });

    const portableDid = await didDht.export();
    
    return portableDid;
}

export const createVC = async (customerName, countryCode, customerDID) => {
    const VC_ISSUER_URL = `https://mock-idv.tbddev.org/kcc?name=${customerName}&country=${countryCode}&did=${customerDID}`;

    const response = await axios.get(VC_ISSUER_URL);
    return response.data;

}