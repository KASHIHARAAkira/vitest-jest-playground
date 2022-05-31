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
  async checkCardName(value: string): Promise<boolean> {
    let con: mariadb.PoolConnection;
    try {
      con = await this.pool.getConnection();
      const result = await con.query(
        "select * from cards where card_name = ?",
        [value]
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
    } catch (err: any) {
      throw new Error(err);
    } finally {
      con.end();
    }
  }
}
