import { NextStates } from "./state";

export type GetFunciton = (key: string) => Promise<{ [key: string]: any }>;
export type SetFunciton = (keyValue: { [key: string]: any }) => Promise<void>;

export class StateStorage {
  constructor(
    private readonly getFunction: GetFunciton,
    private readonly setFunction: SetFunciton
  ) {}

  private static KEY = "KEY";

  async get(): Promise<NextStates | null> {
    const value = await this.getFunction(StateStorage.KEY);
    const raw = value[StateStorage.KEY];
    if (!raw) {
      return null;
    }
    return NextStates.from(raw.states, raw.queue.items);
  }

  async set(states: NextStates) {
    await this.setFunction({ [StateStorage.KEY]: states });
  }
}
