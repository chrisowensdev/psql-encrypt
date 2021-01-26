const db = require('./conn');
require('dotenv').config();

class UsersList {
    constructor(
        id,
        first_name,
        last_name,
        email,
        password,
        team,
        rider_info,
        medical_info
    ) {
        this.id = id;
        this.first_name = first_name;
        this.last_name = last_name;
        this.email = email;
        this.password = password;
        this.team = team;
        this.rider_info = rider_info;
        this.medical_info = medical_info;
    }

    async createUser() {
        try {
            const response = await db.one(
                `INSERT INTO users (first_name, last_name, email, password, team, rider_info, medical_info) VALUES ($1, $2, $3, crypt($4, gen_salt('bf')), $5, $6, pgp_sym_encrypt($7, '${process.env.KEY}')) RETURNING id, first_name, last_name, email, password, rider_info, medical_info;`,
                [
                    this.first_name,
                    this.last_name,
                    this.email,
                    this.password,
                    this.team,
                    this.rider_info,
                    this.medical_info,
                ]
            );
            return response;
        } catch (error) {
            console.error('ERROR', error.message);
            return error.message;
        }
    }

    static async login(email, password) {
        try {
            const response = await db.one(
                `SELECT email, password FROM users WHERE email = ${email} AND password = crypt('${password}', password)`
            );
            return response;
        } catch (error) {
            console.error('ERROR', error.message);
            return error.message;
        }
    }
}

module.exports = UsersList;
