const path = require('path');
const fs = require('fs');

const loginUser = (req, res) => {
    const address = path.resolve('database/users.json');

    fs.readFile(address, 'utf8', (err, data) => {
        if (err) {
            res.status(500).send({ 'msg': 'internal server error' });
        } else {
            const users = JSON.parse(data);
            const { username, password } = req.body;

            const user = users.find(user => user.username === username && user.password === password);

            if (user) {
                req.session.user = user
                res.status(200).send({ success: true, message: 'User logged in successfully' });
            } else {
                res.status(500).send({ success: false, error: 'Failed to login user' });
            }
        }
    });
};

const registerUser = (req, res) => {
    const { name, username, email, password } = req.body;
    const newUser = { name, username, email, password };
    const address = path.resolve('database/users.json');

    fs.readFile(address, 'utf8', (err, data) => {
        if (err) {
            res.status(500).send({ success: false, error: 'Internal server error' });
        } else {
            const users = JSON.parse(data);

            users.push(newUser);

            fs.writeFile(address, JSON.stringify(users), err => {
                if (err) {
                    req.session.user = newUser
                    res.status(500).send({ success: false, error: 'Failed to register user' });
                } else {
                    res.status(200).send({ success: true, message: 'User registered successfully' });
                }
            });
        }
    });
};

module.exports = {
    loginUser,
    registerUser
};
