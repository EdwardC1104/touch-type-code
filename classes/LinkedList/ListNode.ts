/**
 * A node in a linked list.
 */
export default class ListNode<DataType, NextType> {
  /**
   *  Pointer to the next node in the linked list.
   */
  public next: NextType | null;

  /**
   * The data should only be read and modified by methods in this class or any deriving classes.
   */
  protected data: DataType;

  constructor(data: DataType) {
    this.next = null;
    this.data = data;
  }

  protected getData(): DataType {
    return this.data;
  }
}
