import mysql from 'mysql2/promise'
import Connection from 'mysql2/typings/mysql/lib/Connection'

const connectMysql = async () => {
    try {
        const connection = await mysql.createConnection({
            host: process.env.DB_SEED,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            port: Number(process.env.DB_PORT),
            database: process.env.DB_HOST,
        })
        console.log('Database connected!!!')
        return { connection: connection }
    } catch (err) {
        console.log('Database connection error: ' + err)
        return { connection: null }
    }
}

export { connectMysql }
