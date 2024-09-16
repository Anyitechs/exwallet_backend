# ExWallet Backend


## Description

A simple wallet implementation using the tbDex protocol that powers the ExWallet mobile app. The mobile application can be found [here](https://github.com/Anyitechs/exwallet.git)

This backend application is live [here](https://exwallet-7df4d97466ca.herokuapp.com), if you want to interact with the live APIs.

## Installation

```bash
# Clone the repository
$ git clone https://github.com/Anyitechs/exwallet_backend.git

# Change directory
$ cd exwallet_backend

# Install dependencies
$ npm install

```

## Running the app

```bash
# development
$ npm run dev

# production mode
$ npm start
```

## API Endpoints Available
- The following endpoints exposes core tbDex features for a wallet application workflow.

### DID

#### Create DID and VC

- Request Method: POST
```bash
$ /api/v1/did
```
- Sample Payload
```javascript
    const samplePayload = {
        customerName: "Ifeanyi" 
        countryCode: "NGN"
    }
```

#### Get DID and VC

- Request Method: GET
```bash
$ /api/v1/did/:userId
```

### Offerings

#### Get Available Offerings from PFIs

- Request Method: GET
```bash
$ /api/v1/offerings
```

### Exchange

#### Create Exchange

- Request Method: POST
```bash
$ /api/v1/exchange/create
```
```javascript
    const samplePayload = {
        userId, 
        offering, 
        amount, 
        payoutDetails, 
        payinDetails
    }
```

#### Fetch Exchanges

- Request Method: GET
```bash
$ /api/v1/exchange/all/:userId
```

#### Create Order

- Request Method: POST
```bash
$ /api/v1/exchange/order/create
```
```javascript
    const samplePayload = {
        userId, 
        exchangeId, 
        pfiUri
    }
```

#### Close Order

- Request Method: PUT
```bash
$ /api/v1/exchange/order/close
```
```javascript
    const samplePayload = {
        userId, 
        exchangeId, 
        pfiUri, 
        reason
    }
```

#### Purchase a product

- Request Method: POST
```bash
$ /api/v1/users/products
```

### TODO
- Implement a rating and feedback system
- Implement a push notification and in-app notification functionality
- Add unit tests
- Move from SQlite filepath db to a more robust db

## Stay in touch

- Author - [Ifeanyichukwu Amajuoyi](https://www.linkedin.com/in/ifeanyichukwu-amajuoyi-8b6229153/)
- Email - [Aifeanyi019@gmail.com]

