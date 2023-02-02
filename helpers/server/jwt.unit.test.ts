import { issueJWT, verifyJWT } from "./jwt";

describe("issueJWT", () => {
  it("should return a JWT token", () => {
    const token = issueJWT(1);
    expect(token).toMatch(/^Bearer .+/);
  });
});

describe("verifyJWT", () => {
  it("should return the JWT payload", () => {
    const token = issueJWT(1);
    const payload = verifyJWT(token);
    expect(payload.sub).toBe(1);
  });
});
