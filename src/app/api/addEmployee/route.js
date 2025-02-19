import { NextResponse } from "next/server";
import { createConnection } from "../../../../lib/db";
import { writeFile } from "fs/promises";
import { join } from "path";

export async function POST(req) {
  try {
    const formData = await req.formData();

    const name = formData.get("name");
    const email = formData.get("email");
    const phone = formData.get("phone");
    const address = formData.get("address");
    const imageFile = formData.get("image");

    let imagePath = null;

    if (imageFile) {
      const timestamp = Date.now();
      const filename = `${timestamp}-${imageFile.name}`;

      const publicPath = join(process.cwd(), "public", "uploads");
      const filePath = join(publicPath, filename);

      const bytes = await imageFile.arrayBuffer();
      const buffer = Buffer.from(bytes);

      await writeFile(filePath, buffer);

      imagePath = `/uploads/${filename}`;
    }

    const db = await createConnection();

    const sql = `
      INSERT INTO employee_list 
      (name, email, phone, address, image) 
      VALUES (?, ?, ?, ?, ?)
    `;

    const values = [name, email, phone, address, imagePath];

    const [result] = await db.query(sql, values);

    return NextResponse.json({
      message: "Employee added successfully",
      result,
    });
  } catch (error) {
    console.error("Detailed error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
