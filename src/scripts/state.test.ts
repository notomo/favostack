import { CappedQueue, NextStates } from "./state";

describe("CappedQueue", () => {
  it("enqueue", () => {
    const queue = new CappedQueue(3);

    {
      const item = queue.enqueue("a");
      expect(item).toEqual(null);
    }
    {
      const item = queue.enqueue("b");
      expect(item).toEqual(null);
    }
    {
      const item = queue.enqueue("c");
      expect(item).toEqual(null);
    }

    {
      const item = queue.enqueue("d");
      expect(item).toEqual("a");
    }
    {
      const item = queue.enqueue("e");
      expect(item).toEqual("b");
    }
  });

  it("invalid queue size", () => {
    expect(() => new CappedQueue(-1)).toThrowError(
      "queue size should be a positive number"
    );
  });
});

describe("NextStates", () => {
  it("add", () => {
    const states = new NextStates();

    states.add("a");
    states.add("a");
    states.add("b");

    {
      const canMove = states.next("a");
      expect(canMove).toEqual(false);
    }
    {
      const canMove = states.next("a");
      expect(canMove).toEqual(true);
    }

    {
      const canMove = states.next("a");
      expect(canMove).toEqual(false);
    }
    {
      const canMove = states.next("b");
      expect(canMove).toEqual(false);
    }

    states.add("c");
    states.add("d");
    states.add("e");

    {
      const canMove = states.next("b");
      expect(canMove).toEqual(false);
    }
  });
});
