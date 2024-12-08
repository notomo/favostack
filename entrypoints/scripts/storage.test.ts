import { describe, it, expect } from "vitest";
import { StateStorage, SetFunciton, GetFunciton } from "./storage";
import { NextStates } from "./state";

const mock = (): [SetFunciton, GetFunciton] => {
  const stored: { [key: string]: any } = {};

  const set = async (keyValue: { [key: string]: any }) => {
    for (const key of Object.keys(keyValue)) {
      stored[key] = JSON.parse(JSON.stringify(keyValue[key]));
    }
  };

  const get = async (_key: string) => {
    return stored;
  };

  return [set, get];
};

describe("StateStorage", () => {
  it("set and get", async () => {
    const [set, get] = mock();

    const storage = new StateStorage(get, set);

    const states = new NextStates();
    await storage.set(states);

    const got = await storage.get();
    expect(got).toBeTruthy();
  });

  it("get", async () => {
    const [set, get] = mock();

    const storage = new StateStorage(get, set);

    const got = await storage.get();
    expect(got).toBeNull();
  });
});
