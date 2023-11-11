import app from "../index";
import request from "supertest";

import { loginService } from "../Services/user.service";
import { lyricTest } from "../Mock/lyric.mock";
import { findUserByIdRepository } from "../Repositories/user.repository";
import { ObjectId } from "mongodb";

describe("User Controller Route", () => {
  it("should be able to create a new user", async () => {
    let fakeUser = Math.floor(Date.now() * Math.random()).toString(36);

    const response = await request(app)
      .post("/user/sign-up")
      .send({
        email: `${fakeUser}@spoofy.com`,
        password: "testapi123#",
        avatar: "random_image.png"
      });

    expect(response.status).toBe(200);
  });

  it("should be able login in platform", async () => {
    const response = await request(app).post("/user/login").send({
      email: "apitest@spoofy.com",
      password: "123456789#"
    });

    expect(response.status).toBe(200);
  });

  it("create a musical playlist for a user", async () => {
    const response = await request(app).patch("/user/create-playlist").send({
      id: "654e3654a4fa8089a7fbe782",
      playlistName: "Test Playlist"
    });

    expect(response.status).toBe(200);
  });

  it("should be able to valid user session cookies", async () => {
    const login = await loginService("apitest@spoofy.com", "123456789#");

    const response = await request(app)
      .get("/user/auth")
      .set("Authorization", `Bearer ${login.token.token}`);

    expect(response.status).toBe(200);
  });

  it("should be able find a playlist by user id", async () => {
    const response = await request(app)
      .get("/user/find-playlist-by-user")
      .send({ userId: "654e3654a4fa8089a7fbe782" });

    expect(response.status).toBe(200);
  });

  it("should be able find a playlist by playlist id", async () => {
    const response = await request(app)
      .get("/user/find-playlist-by-user")
      .send({ userId: "654e3654a4fa8089a7fbe782", playlistId: "1vnwvj7v" });

    expect(response.status).toBe(200);
  });

  it("insert a lyric object inside a playlist", async () => {
    const response = await request(app)
      .patch("/user/add-lyric")
      .send(lyricTest);

    expect(response.status).toBe(200);
  });

  /*
  it("should be able remove a playlist", async () => {
    const testUserId = "654e3654a4fa8089a7fbe782";
    const id = new ObjectId(testUserId);

    const user = await findUserByIdRepository(id);
    const playlistToDelete = user?.myPlaylists[0].playlistId;

    const response = await request(app).patch("/user/remove-playlist").send({
      id: testUserId,
      playlistId: playlistToDelete
    });

    expect(response.status).toBe(200);
  });
  */
});
