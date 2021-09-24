# mohawk

create a add and get api for moha

Download the zip file and unzip and directly run it no need to install npm node module already is there just need to run node server using command npm run start.

If need then use below command

1. Install npm module - npm install

2. Install express framework for creating the routes - npm install express

3. Install mongoose for mongodb database - npm install mongoose

4. Install chai mocha mockgoose for testing - npm install chai mocha mockgoose supertest

5. Install jsonwebtoken for create jwt token - npm install jsonwebtoken

6. Install nyc for checking line coverage - npm install nyc

7. To run node server use command - run npm start

8. To run test case use command - run npm test

9. To Check for line coverage use command - npm run precommit

API - 
--------------------------------

Token create API - localhost:3000/oauth/token
Method - POST
Request payload - {
    "name": "xyz"
}

Response - {
    "access_token": "eyJhbGciOiJIUzI1NiIkpXVCJ9.eyJuYW1ibmFtZSIsImlhdCI6MTYzMjA2NjEzNywiZXhwIjoxNjMyNjcwOTM3fQ.58Oc4-xGdDuAdaViSpknh5VWDoPV0v_F49FXCCCJMR0",
    "token_type": "jwt",
    "statusCode": 200
}
--------------------------------

Add user API - localhost:3000/users
Method - POST
Request payload - {
    "name": "Vishal",
    "address": "Palachourai"
}

Response - {
    "data": {
        "_id": "61478991eb87f8bebdd92005",
        "name": "Vishal",
        "address": "Palachourai",
        "__v": 0
    },
    "statusCode": 200
}
---------------------------------

Get use API - localhost:3000/users
Method - GET
Response - {
    "data": [
        {
            "_id": "61476965508448ab7d0d96d5",
            "name": "Vivek",
            "address": "chhindwara",
            "__v": 0
        }
    ],
    "statusCode": 200
}
---------------------------------
