import { createConnection, Connection } from 'typeorm';
import User from '../app/users/user.entity';

export default class Database {
    private static connection: Connection;

    public static connect(): Promise<any> {
        return new Promise(async (resolve, reject) => {
            try {
                const connection = await createConnection();
                this.setConnection(connection);
                resolve(connection);
            } catch (error) {
                reject(error);
            }
        })
    }

    private static setConnection(connection: Connection) {
        this.connection = connection;
    }
}