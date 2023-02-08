import ListNode from "./ListNode";

describe("ListNode", () => {
  it("should be able to create a ListNode", () => {
    const node = new ListNode(1);
    expect(node).toBeDefined();
  });

  it("should be able to get the data from a ListNode", () => {
    const node = new ListNode(1);
    // @ts-ignore - This is a protected method, but we're testing it here.
    expect(node.getData()).toBe(1);
  });
});
