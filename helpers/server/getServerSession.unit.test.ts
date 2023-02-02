import { IncomingMessage } from "http";
import { JsonWebTokenError } from "jsonwebtoken";
import { getServerSession } from "./getServerSession";
import Database from "classes/server/Database";
import jsonwebtoken from "jsonwebtoken";

describe("getServerSession", () => {
  it("should return null if no token is found", async () => {
    const req = {
      headers: {
        cookie: "",
      },
    } as IncomingMessage & {
      cookies: Partial<{
        [key: string]: string;
      }>;
    };
    await expect(getServerSession(req)).resolves.toBeNull();
  });

  it("should return null if the token is invalid", async () => {
    const req = {
      headers: {
        cookie: "jwt=Bearer%20eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9",
      },
    } as IncomingMessage & {
      cookies: Partial<{
        [key: string]: string;
      }>;
    };
    await expect(getServerSession(req)).rejects.toThrow(JsonWebTokenError);
  });

  it("should return null if the token is valid but the user id is invalid", async () => {
    const req = {
      headers: {
        cookie: "jwt=Bearer%20eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9",
      },
    } as IncomingMessage & {
      cookies: Partial<{
        [key: string]: string;
      }>;
    };

    jest.mock("jsonwebtoken");
    jsonwebtoken.verify = jest.fn().mockReturnValue({ sub: "" });

    await expect(getServerSession(req)).resolves.toBeNull();
  });

  it("should return null if the user is not found", async () => {
    const req = {
      headers: {
        cookie: "jwt=Bearer%20eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9",
      },
    } as IncomingMessage & {
      cookies: Partial<{
        [key: string]: string;
      }>;
    };

    jest.mock("jsonwebtoken");
    jsonwebtoken.verify = jest.fn().mockReturnValue({ sub: "2" });

    jest.mock("classes/server/Database");
    Database.getUserById = jest.fn().mockReturnValue(undefined);

    await expect(getServerSession(req)).resolves.toBeNull();
  });

  it("should return the user data if the user is found", async () => {
    const req = {
      headers: {
        cookie: "jwt=Bearer%20eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9",
      },
    } as IncomingMessage & {
      cookies: Partial<{
        [key: string]: string;
      }>;
    };

    const userDataFromDatabase = {
      id: 2,
      name: "John Doe",
      username: "johndoe",
      email: "example@example.com",
    };

    jest.mock("jsonwebtoken");
    jsonwebtoken.verify = jest.fn().mockReturnValue({ sub: "2" });

    jest.mock("classes/server/Database");
    Database.getUserById = jest.fn().mockReturnValue(userDataFromDatabase);

    await expect(getServerSession(req)).resolves.toEqual(userDataFromDatabase);
  });
});
