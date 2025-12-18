import { type NextState, NextStates } from "./state";

type StoredData = {
  states: { [key: string]: NextState };
  queue: { items: string[] };
};

export type GetFunciton = (key: string) => Promise<{ [key: string]: unknown }>;
export type SetFunciton = (keyValue: {
  [key: string]: unknown;
}) => Promise<void>;

export class StateStorage {
  constructor(
    private readonly getFunction: GetFunciton,
    private readonly setFunction: SetFunciton,
  ) {}

  private static KEY = "KEY";

  async get(): Promise<NextStates | null> {
    const value = await this.getFunction(StateStorage.KEY);
    const raw = value[StateStorage.KEY] as StoredData | undefined;
    if (!raw) {
      return null;
    }
    return NextStates.from(raw.states, raw.queue.items);
  }

  async set(states: NextStates) {
    await this.setFunction({ [StateStorage.KEY]: states });
  }
}
