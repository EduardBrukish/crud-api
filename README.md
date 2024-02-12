Application CRUD API on noodejs

#### 1. Clone repo

```
git clone git@github.com:EduardBrukish/crud-api.git
```

#### Go to the project folder

```
cd crud-api
```

#### Install all needed dependencies

```
npm install
```

#### Run in development mode

```
npm run start:dev
```
In terminal you will see the message: Server is running on port ${Port}

---

## How to interact with the API

#### Get all users

Note: If you wouldn't update .env file. Server will running on 5000 port

```
method: GET
url: http://localhost:5000/api/users
```

#### Get user

```
method: GET
url: http://localhost:5000/api/users/${userID}
```

#### Add user

```
method: POST
url: http://localhost:5000/api/users
body: {
    "username": "Super duper name",
    "age": 20,
    "hobbies": ["smth"]
}
type: JSON
```

#### Update user

```
method: PUT
url: http://localhost:5000/api/users/${userID}
body: {
    "username": "Super name",
    "age": 120,
    "hobbies": ["sleep"]
}
type: JSON
```

#### Delete user

```
method: DELETE
url: http://localhost:5000/api/users/${userID}
```