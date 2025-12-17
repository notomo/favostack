import { describe, expect, it } from "vitest";
import { NextStates } from "./state";
import { type GetFunciton, type SetFunciton, StateStorage } from "./storage";

const mock = (): [SetFunciton, GetFunciton] => {
  const stored: { [key: string]: unknown } = {};

  const set = async (keyValue: { [key: string]: unknown }) => {
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
