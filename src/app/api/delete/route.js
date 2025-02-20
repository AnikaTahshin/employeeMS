import { createConnection } from "../../../../lib/db.js";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    let passedValue = await new NextResponse(req.body).text();
    let bodyreq = JSON.parse(passedValue);
    const { name, email, phone, address, id} = bodyreq;
    const db = await createConnection();
    const sql =
      "UPDATE employee_list SET name = ?, email = ?, phone = ?, address = ? WHERE id = ?";
    const values = [name, email, phone, address, id];

    const [result] = await db.query(sql, values);

    return NextResponse.json({
      message: "Employee updated successfully",
      result,
    });
  } catch (error) {
    // console.log(error);
    return NextResponse.json({ error: error.message });
  }
}
