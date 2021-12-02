export enum NextState {
  temporary,
  permanent,
}

export class NextStates {
  private static QUEUE_SIZE = 3;

  constructor(
    private readonly states: Map<string, NextState> = new Map<
      string,
      NextState
    >(),
    private readonly queue: CappedQueue<string> = new CappedQueue<string>(
      NextStates.QUEUE_SIZE
    )
  ) {}

  public add(id: string) {
    if (!this.states.has(id)) {
      const outdatedId = this.queue.enqueue(id);
      if (outdatedId !== null) {
        this.states.delete(outdatedId);
      }
    }

    this.states.set(id, NextState.temporary);
  }

  public next(id: string): boolean {
    const state = this.states.get(id);
    if (state === undefined) {
      return false;
    }

    if (state === NextState.temporary) {
      this.states.set(id, NextState.permanent);
      return false;
    }

    this.states.delete(id);
    return true;
  }

  public static from(
    raw_states: { [key: string]: NextState },
    items: string[]
  ) {
    const queue = new CappedQueue<string>(NextStates.QUEUE_SIZE);
    for (const item of items) {
      queue.enqueue(item);
    }

    const states = new Map<string, NextState>();
    for (const key of Object.keys(raw_states)) {
      states.set(key, raw_states[key]);
    }

    return new NextStates(states, queue);
  }
}

export class CappedQueue<T> {
  private readonly items: T[] = [];

  constructor(private readonly size: number) {
    if (size < 0) {
      throw new Error("queue size should be a positive number");
    }
  }

  public enqueue(item: T): T | null {
    let outdated: T | null = null;
    if (this.items.length == this.size) {
      outdated = this.items.shift() as T;
    }

    this.items.push(item);

    return outdated;
  }
}
