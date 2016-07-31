module.exports = {
    db: {
        database: "balance",
        host: "127.0.0.1",
        port: 3306,
        username: process.env.MYSQL_USERNAME,
        password: process.env.MYSQL_PASSWORD,
    }
};
