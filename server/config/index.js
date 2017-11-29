
export default {
    debug: true,
    port: process.env.PORT || 3000,
    db: {
        str: "mongodb://127.0.0.1:27017/edit_users",
        auth: false
    },
    jwt: {
        secret: 'secret'
    },
    url: process.env.HOST || "http://localhost:8000"
}