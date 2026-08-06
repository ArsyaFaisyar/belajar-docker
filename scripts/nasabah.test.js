// const request = require("supertest");

// const app = require("../src/app");
// const pool = require("../src/config/database");

// beforeEach(async () => {
//   await pool.query("TRUNCATE TABLE nasabah RESTART IDENTITY");
// });

// afterAll(async () => {
//   await pool.end();
// });

// describe("HEALTH CHECK", () => {
//   test("POST /api/nasabah membuat nasabah baru", async () => {
//     const response = await request(app).post("/api/nasabah").send({
//       nama: "patrick",
//       email: "amir@gmail.com",
//       no_hp: "0852424255",
//       alamat: "surabaya",
//       saldo: "20000",
//     });

//     expect(response.statusCode).toBe(200);
//     expect(response.body.status).toBe("success");
//     expect(response.body.nama).toBe("patrick");
//     expect(response.body.email).toBe("amir@gmail.com");
//   });
//   test("POST /api/nasabah ditolak jika nama tidak terkirim", async () => {
//     const response = await request(app).post("/api/nasabah").send({
//       email: "user@gmail.com",
//     });

//     expect(response.statusCode).toBe(400);
//     expect(response.body.status).toBe("fail");
//   });

//   test("GET /api/nasbah mengambil data seluruh nasabah", async () => {
//     await request(app).post("/api/nasabah").send({
//       nama: "patrick",
//       email: "amir@gmail.com",
//       saldo: "20000",
//     });

//     const response = await request(app).get("/api/nasabah");
//     expect(response.statusCode).toBe(200);
//     expect(response.body.total).toBe("1");
//     expect(response.body.data).toHaveLength(1);
//   });
// });

const request = require("supertest");

const app = require("../src/app");
const pool = require("../src/config/database");

beforeEach(async () => {
  await pool.query("TRUNCATE TABLE nasabah RESTART IDENTITY");
});

afterAll(async () => {
  await pool.end();
});

describe("Health Check", () => {
  test("GET /health mengembalikan status 200", async () => {
    const response = await request(app).get("/health");

    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe("success");
  });
});

describe("CRUD Nasabah", () => {
  test("POST /api/nasabah membuat nasabah baru", async () => {
    const response = await request(app).post("/api/nasabah").send({
      nama: "Citra Lestari",
      email: "citra@example.com",
      no_hp: "08345678901",
      alamat: "Surabaya",
      saldo: 1000000,
    });

    expect(response.statusCode).toBe(201);
    expect(response.body.status).toBe("success");
    expect(response.body.data.nama).toBe("Citra Lestari");
    expect(response.body.data.email).toBe("citra@example.com");
  });

  test("POST /api/nasabah ditolak jika nama tidak dikirim", async () => {
    const response = await request(app).post("/api/nasabah").send({
      email: "tanpanama@example.com",
    });

    expect(response.statusCode).toBe(400);
    expect(response.body.status).toBe("fail");
  });

  test("GET /api/nasabah mengambil seluruh nasabah", async () => {
    await request(app).post("/api/nasabah").send({
      nama: "Budi Santoso",
      email: "budi@example.com",
      saldo: 500000,
    });

    const response = await request(app).get("/api/nasabah");

    expect(response.statusCode).toBe(200);
    expect(response.body.total).toBe(1);
    expect(response.body.data).toHaveLength(1);
  });
});