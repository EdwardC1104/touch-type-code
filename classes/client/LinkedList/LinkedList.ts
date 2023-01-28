import ListNode from "./ListNode";

export default class LinkedList<
  DataType,
  NodeType extends ListNode<DataType, NodeType>
> {
  /**
   * The first node in the linked list.
   */
  protected head: NodeType | null;

  constructor() {
    this.head = null;
  }

  /**
   * Adds a new node to the end of the linked list.
   */
  protected addNode(newNode: NodeType) {
    // If the linked list is empty, make the new node the head.
    if (this.head === null) {
      this.head = newNode;
      return;
    }

    // Otherwise, find the last node in the linked list and add the new node after that.
    let currentNode = this.head;
    while (currentNode.next !== null) {
      currentNode = currentNode.next;
    }
    currentNode.next = newNode;
  }
}
