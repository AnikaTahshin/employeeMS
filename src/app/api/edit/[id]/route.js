import { NextResponse } from "next/server";
import { createConnection } from "../../../../../lib/db.js";

export async function PATCH(req, { params }) {
  try {
    // Parse request body
    const { name, email, phone, address } = await req.json();
    // const { id } = params;
    const id = params?.id
console.log("params",id)
    // Create database connection
    const db = await createConnection();

    // SQL Query
    const sql =
      "UPDATE employee_list SET name = ?, email = ?, phone = ?, address = ? WHERE id = ?";
    const values = [name, email, phone, address, id];

    const [result] = await db.query(sql, values);

    return NextResponse.json({
      message: "Employee updated successfully",
      result,
      statusbar:200
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
