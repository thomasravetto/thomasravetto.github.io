const bcrypt = require('bcrypt');

const { registerUserIntoDatabase } = require('../../app/register/register.data-access');

async function handleRegister (username, email, password) {
    try {
        const hash = await hashPassword(password);

        const newUser = await registerUserIntoDatabase(username, email, hash);

        if (newUser) {
            return newUser
        } else {
            return [{ error: 'User already exists' }];
        }

    } catch (error) {
        return { error: error.message };
    }
}

async function hashPassword (password) {
    return await bcrypt.hash(password, 10);
}

module.exports = {
    handleRegister,
}
