import LinkedList from "./LinkedList";
import ListNode from "./ListNode";

describe("LinkedList", () => {
  it("should be able to create a LinkedList", () => {
    const linkedList = new LinkedList<number, any>();
    expect(linkedList).toBeDefined();
  });

  it("should be able to add a node to the linked list", () => {
    const linkedList = new LinkedList<number, any>();
    // @ts-ignore - This is a protected method, but we're testing it here.
    linkedList.addNode(new ListNode(1));
    // @ts-ignore - This is a protected method, but we're testing it here.
    expect(linkedList.head.getData()).toBe(1);
  });

  it("should be able to add multiple nodes to the linked list", () => {
    const linkedList = new LinkedList<number, any>();
    // @ts-ignore - This is a protected method, but we're testing it here.
    linkedList.addNode(new ListNode(1));
    // @ts-ignore - This is a protected method, but we're testing it here.
    linkedList.addNode(new ListNode(2));
    // @ts-ignore - This is a protected method, but we're testing it here.
    expect(linkedList.head.getData()).toBe(1);
    // @ts-ignore - This is a protected method, but we're testing it here.
    expect(linkedList.head.next.getData()).toBe(2);
  });
});
