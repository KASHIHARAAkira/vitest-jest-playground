import { describe, it, expect, vi, afterAll } from "vitest";
import OperateMariadb from "../lib/operate_mariadb";

describe("Interface testing.", () => {
  it("Expected running.", async () => {
    const operateMariadb = new OperateMariadb();
    await operateMariadb.getConnection();
    expect(operateMariadb.connection).not.toBeUndefined();
    operateMariadb.poolEnd();
  });
});

describe("Error handling testing.", () => {
  it("this.pool.getConnection throws error.", async () => {
    const operateMariadb = new OperateMariadb();

    vi.mock("operateMariadb");
    vi.spyOn(operateMariadb.pool, "getConnection").mockImplementation(
      async () => {
        throw new Error("Connection failed.");
      }
    );

    expect(operateMariadb.getConnection()).rejects.toThrow(
      "Connection failed."
    );

    operateMariadb.poolEnd();
  });
});
