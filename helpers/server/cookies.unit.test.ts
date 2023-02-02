import { NextApiRequest, NextApiResponse } from "next";
import { setCookie, getCookie } from "./cookies";

describe("setCookie", () => {
  it("should set a cookie", () => {
    const res = {
      setHeader: jest.fn(),
    } as Partial<NextApiResponse> as NextApiResponse;

    setCookie(res, "test", "test");

    expect(res.setHeader).toHaveBeenCalledWith(
      "Set-Cookie",
      "test=test; Max-Age=604800; Path=/; HttpOnly; SameSite=Strict"
    );
  });
});

describe("getCookie", () => {
  it("should get a cookie", () => {
    const req = {
      headers: {
        cookie: "test=test",
      },
    } as Partial<NextApiRequest> as NextApiRequest;

    expect(getCookie(req, "test")).toBe("test");
  });
});
