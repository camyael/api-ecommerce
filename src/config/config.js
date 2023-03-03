import dotenv from 'dotenv';

dotenv.config()

export default {
    app: {
        admin_email : process.env.ADMIN_EMAIL,
        admin_password: process.env.ADMIN_PASSWORD,
        port : process.env.PORT || '',
        persistence : process.env.PERSISTENCE || 'MONGODB',
        app_frontend : process.env.APP_FRONTEND,
        public_url : process.env.PUBLIC_URL || 'http://localhost:8080'
    },
    mongo : {
        url : process.env.MONGO_URL
    },
    nodemailer : {
        user : process.env.NODEMAILER_USER,
        password : process.env.NODEMAILER_PASSWORD
    },
    twilio : {
        user : process.env.TWILIO_USER,
        token : process.env.TWILIO_TOKEN,
        number : process.env.TWILIO_NUMBER
    },
    jwt : {
        cookie : process.env.COOKIE_SESSION || "pruebaCookie",
        secret : process.env.JWT_SECRET
    }
}