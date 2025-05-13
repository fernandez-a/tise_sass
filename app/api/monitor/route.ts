import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await fetch("http://127.0.0.1:5000/api/initial_products");

    if (!response.ok) {
      console.error(`Failed to fetch data from Flask app: ${response.status}`);
      return NextResponse.json({ success: false, error: `HTTP error! status: ${response.status}` }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json({ success: true, results: data });

  } catch (error) {
    console.error("Error fetching data from Flask app:", error);
    return NextResponse.json({ success: false, error: error }, { status: 500 });
  }
}