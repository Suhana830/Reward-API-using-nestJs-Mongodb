<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">

---
# 🎁 Rewards API

This is a backend API built using *NestJS* and *MongoDB* to manage users' reward points, transactions, and redemption options.

---

## 📦 Features

- User reward creation and tracking
- Transaction-based reward system
- Redeem reward points for cashback, vouchers, and more
- Mongoose timestamps support
- Well-structured error handling
- Postman collection 

---
[3:44 PM, 7/10/2025] ..j: 
## 🚀 Getting Started

### ✅ Prerequisites

- Node.js v16+
- MongoDB (local or Atlas)

---

### 📥 Installation

```bash
git clone https://github.com/your-username/rewards-api.git
cd rewards-api
npm install

```

A NestJS + MongoDB API that manages users, reward points, transactions, and reward redemptions.

---

## 🚀 Setup & Run


### 1. Clone the repo

```bash
https://github.com/Suhana830/Reward-API-using-nestJs-Mongodb
```

### 2. Install dependencies
```bash
npm install
```


---

### 3. Environment Variables

Create a .env file in the root directory:
```bash

MONGO_URL=mongodb://localhost:27017/rewards-api
```

---

### 4. 🌐 Base URL


http://localhost:3000


---

## 📘 API Endpoints

### 📍 GET /rewards/points

*Description:*  
Fetch total reward points and last updated time for a specific user.

*Query Params:*

| Param   | Type   | Required | Description    |
|---------|--------|----------|----------------|
| userId  | string | ✅ Yes   | ID of the user |

*Example:*

bash
GET /rewards/points?userId=USER123


*Response:*

json
{
  "status": "success",
  "data": {
    "totalPoints": 150,
    "updateAt": "2025-07-10T09:32:18.123Z"
  }
}


---

### 📍 GET /rewards/transaction

*Description:*  
Fetch the last 5 transactions that earned rewards for a user (pagination supported).

*Query Params:*

| Param    | Type   | Required | Description             |
|----------|--------|----------|-------------------------|
| userId   | string | ✅ Yes   | ID of the user          |


*Example:*

bash
GET /rewards/transaction?userId=USER123


*Response:*

json
{
  "status": "success",
  "count": 5,
  "data": [
    {
      "_id": "txn1",
      "userId": "USER123",
      "pointsEarned": 50,
      "createdAt": "2025-07-10T12:00:00Z"
    },
    ...
  ]
}


---

### 📍 POST /rewards/redeem

*Description:*  
Redeem reward points for a specific option (cashback, voucher, etc.)

*Body (JSON):*

json
{
  "userId": "USER123",
  "rewardType": "cashback"
}


*Response:*

json
{
  "userId": "USER123",
  "rewardType": "cashback",
  "pointsRedeemed": 100,
  "remainingPoints": 200
}


---

### 📍 GET /rewards/options

*Description:*  
Fetch available reward options.

*Example:*

bash
GET /rewards/options


*Response:*

json
[
  { "type": "cashback", "pointsRequired": 100 },
  { "type": "voucher", "pointsRequired": 150 },
  { "type": "gift_card", "pointsRequired": 200 },
  { "type": "discount_coupon", "pointsRequired": 80 }
]



---



## 📂 Postman Collection

Import the provided Postman collection (postman_collection.json) into Postman for testing all routes with sample data.

---

## 👨‍💻 Author

Developed for internship assignment. Built with ❤️ by Suhana using NestJS and MongoDB.


