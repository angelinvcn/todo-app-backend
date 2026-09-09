import pool from "./config/database";

async function testDatabase() {
  try {
    const connection = await pool.getConnection();

    console.log("✅ Berhasil terhubung ke MySQL!");

    connection.release();
  } catch (error) {
    console.error("❌ Gagal terhubung ke MySQL:", error);
  }
}

testDatabase();