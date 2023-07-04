const express = require('express');
const router = express.Router();

const users = require('../database/user');

router.use(express.json());

// GET API for health check of the server.
// http://localhost:3000/health-check
router.get('/health-check', (req, res) => {
    res.send('I am OK');
});


// GET API for getting all the users from the database. ('../database/user')
// http://localhost:3000/users
// Sample Success Response :
// {
//     message : “Users retrieved”,
//     success : true,
//     users : [{
//         email : “abc@abc.ca”,
//         firstName : “ABC”,
//         id : “5abf6783”
//         },
//         {
//         email : “xyz@xyz.ca”,
//         firstName: “XYZ”,
//         id : “5abf674563”
//         }]
//     }]
// }
    
router.get('/users', (req, res) => {
    const response = {
        message: 'Users retrieved',
        success: true,
        users: users
    }
    res.send(response);
});


// POST API for creating a new user.
// http://localhost:3000/add
// body data:
// {
//     email : “xyz@xyz.ca”,
//     firstName: “XYZ”,
// }
// Sample Success Response:
// {
//     message : “User added”,
//     success : true
// }
router.post('/add', (req, res) => {
    
    const user = {
        id: users.length + 1,
        name: req.body.name,
        email: req.body.email
    }
    users.push(user);
    const response = {
        message: 'User added',
        success: true
    }
    res.send(response);
});


// PUT API for updating an existing user.
// http://localhost:3000/update/:id
// body data:
// {
//     email : “xyz@xyz.ca”,
//     firstName: “XYZ”,
// }
// Sample Success Response :
// {
//     message : “User updated”,
//     success : true
// }
router.put('/update/:id', (req, res) => {
    const id = req.params.id;
    const user = users.find(user => user.id == id);
    user.name = req.body.name;
    user.email = req.body.email;
    const response = {
        message: 'User updated',
        success: true
    }
    res.send(response);
});


// GET API to get a single user by id.
// http://localhost:3000/user/:id
// Sample Success Response :
// {
//     success : true,
//     user : {
//         email : “xyz@xyz.ca”,
//         firstName: “XYZ”,
//         id : “5abf674563”
//     }
// }
router.get('/user/:id', (req, res) => {
    const id = req.params.id;
    const user = users.find(user => user.id == id);
    const response = {
        success: true,
        user: user
    }
    res.send(response);
});

module.exports = router;