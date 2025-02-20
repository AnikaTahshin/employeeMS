import { NextResponse } from "next/server";
import { createConnection } from "../../../../../lib/db.js";

export async function DELETE(req, { params }) {
  try {
    const { id } = params;
    // console.log("from server", id);
    const db = await createConnection();
    const sql =
    "DELETE FROM employee_list WHERE id=?"
    const values = [id];

    const [result] = await db.query(sql, values);

    return NextResponse.json({
      message: "Employee Deleted successfully",
      result,
      
    });
  } catch (error) {
    // console.log(error);
    return NextResponse.json({ error: error.message });
  }
}
