import { describe, it, expect, vi, afterAll } from "vitest";
import OperateMariadb from "../lib/operate_mariadb";

describe("Interface testing.", async () => {
  const operateMariadb = new OperateMariadb();
  await operateMariadb.getConnection();

  afterAll(() => {
    operateMariadb.disconnection();
    operateMariadb.poolEnd();
  });

  it("Expected return value is true.", async () => {
    const result: boolean = await operateMariadb.checkCardName("king");
    expect(result).toBeTruthy();
  });

  it("Expected return value is false.", async () => {
    const result: boolean = await operateMariadb.checkCardName("jack");
    expect(result).toBeFalsy();
  });
});

describe("Error handling testing.", () => {
  it("con.query throws error", async () => {
    const operateMariadb = new OperateMariadb();
    await operateMariadb.getConnection();
    if (operateMariadb.connection) {
      vi.spyOn(operateMariadb.connection, "query").mockImplementation(() =>
        Promise.reject(new Error("Query Error."))
      );

      expect(operateMariadb.checkCardName("king")).rejects.toThrow(
        "Query Error."
      );
      operateMariadb.disconnection();
      operateMariadb.poolEnd();
    }
  });

  it("this.connection is undefined.", () => {
    const operateMariadb = new OperateMariadb();

    expect(operateMariadb.checkCardName("king")).rejects.toThrow(
      "The database connection does not exist."
    );

    operateMariadb.poolEnd();
  });
});
