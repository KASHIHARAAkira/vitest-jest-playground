import mariadb, { Connection, Pool } from "mariadb";
export default class OperateMariadb {
  pool: Pool;
  connection: Connection | undefined;
  constructor() {
    this.pool = mariadb.createPool({
      host: process.env.MARIADB_HOST,
      user: process.env.MARIADB_USER,
      password: process.env.MARIADB_PASSWORD,
      database: process.env.MARIADB_DATABASE,
    });
  }

  async getConnection(): Promise<void> {
    try {
      this.connection = await this.pool.getConnection();
    } catch (err: any) {
      throw new Error(err);
    }
  }

  async disconnection(): Promise<boolean> {
    if (this.connection) {
      try {
        await this.connection.end();
        return true;
      } catch (err: any) {
        throw new Error(err);
      }
    } else {
      throw new Error("The connection has not been established.");
    }
  }

  poolEnd() {
    this.pool.end();
  }

  async checkCardName(cardName: string): Promise<boolean> {
    try {
      if (this.connection) {
        const result = await this.connection.query(
          "select * from cards where card_name = ?",
          [cardName]
        );
        delete result.meta;
        const lengthObj = Object.keys(result).length;
        if (lengthObj > 0) {
          return true;
        } else if (lengthObj === 0) {
          return false;
        } else {
          throw new Error("Object length is invalid in checkCardName.");
        }
      } else {
        throw new Error("The database connection does not exist.");
      }
    } catch (err: any) {
      throw new Error(err);
    }
  }
}
