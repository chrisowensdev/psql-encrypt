const db = require('./conn');
require('dotenv').config();

class UsersList {
    constructor(id, username, email, password, rider_name, medical_info) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.password = password;
        this.rider_name = rider_name;
        this.medical_info = medical_info;
    }

    async createUser() {
        try {
            const response = await db.one(
                `INSERT INTO demo (username, email, password, rider_name, medical_info) VALUES ($1, $2, crypt($3, gen_salt('bf')), $4, pgp_sym_encrypt($5, '${process.env.KEY}')) RETURNING id, username, email, password, rider_name, medical_info;`,
                [
                    this.username,
                    this.email,
                    this.password,
                    this.rider_name,
                    this.medical_info,
                ]
            );
            return response;
        } catch (error) {
            console.error('ERROR', error.message);
            return error.message;
        }
    }

    static async getDecrypted(email) {
        try {
            const response = await db.one(
                `SELECT id, username, rider_name, pgp_sym_decrypt(medical_info::bytea, '${process.env.KEY}') as medical_info FROM demo WHERE email = $1;`,
                [email]
            );
            return response;
        } catch (error) {
            console.error('ERROR', error.message);
            return error.message;
        }
    }

    static async getEncrypted(email) {
        try {
            const response = await db.one(
                `SELECT id, username, email, password, rider_name, medical_info FROM demo WHERE email = $1;`,
                [email]
            );
            return response;
        } catch (error) {
            console.error('ERROR', error.message);
            return error.message;
        }
    }
}

module.exports = UsersList;
