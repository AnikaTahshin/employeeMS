import React from "react";

import { createConnection } from "../../../../lib/db.js";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const db = await createConnection();
    const sql = "SELECT * FROM employee_list";

    const [employee_list] = await db.query(sql);
    return NextResponse.json(employee_list);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error.message });
  }
}
