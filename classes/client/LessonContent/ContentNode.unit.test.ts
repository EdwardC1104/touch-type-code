import ContentNode from "./ContentNode";

describe("ContentNode", () => {
  it("should be able to create a ContentNode", () => {
    const contentNode = new ContentNode("u", "CURRENT");
    expect(contentNode).toBeDefined();
  });

  it("should be able to get its state", () => {
    const contentNode = new ContentNode("u", "CURRENT");
    expect(contentNode.getState()).toBe("CURRENT");
  });

  it("should be able to set its state", () => {
    const contentNode = new ContentNode("u", "CURRENT");
    contentNode.setState("CORRECT");
    expect(contentNode.getState()).toBe("CORRECT");
  });

  it("should be able to get its msToType", () => {
    const contentNode = new ContentNode("u", "CURRENT");
    expect(contentNode.getMsToType()).toBe(0);
  });

  it("should be able to set its msToType", () => {
    const contentNode = new ContentNode("u", "CURRENT");
    contentNode.setMsToType(1000);
    expect(contentNode.getMsToType()).toBe(1000);
  });

  it("should be able to get the raw letter it contains", () => {
    const contentNode = new ContentNode("u", "CURRENT");
    expect(contentNode.getRawLetter()).toBe("u");
  });

  it("should be able to calculate its custom css based on its state", () => {
    const contentNode = new ContentNode("u", "CORRECT");
    expect(contentNode.getCustomTextStyle()).toEqual({
      borderRadius: "0.25rem",
      transition: "all 0.1s ease-in-out",
      color: "rgb(34 197 94)",
      backgroundColor: "transparent",
    });
  });

  it("should be able to return the letter as displayed in the UI", () => {
    const contentNode = new ContentNode("\t", "CORRECT");
    expect(contentNode.getLetterToDisplay()).toBe("  ");
  });

  it("should be able to return the letter as it appears on the keyboard", () => {
    const contentNode = new ContentNode("\t", "CORRECT");
    expect(contentNode.getLetterOnKeyboard()).toBe("tab");
  });
});
