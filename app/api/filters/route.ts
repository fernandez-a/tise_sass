import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const queryString = searchParams.toString(); // capture full query string
    const flaskUrl = `http://127.0.0.1:5000/api/filter?${queryString}`;

    console.log("Forwarding to Flask URL:", flaskUrl);

    const response = await fetch(flaskUrl);

    if (!response.ok) {
      console.error(`Failed to fetch data from Flask app: ${response.status}`);
      return NextResponse.json(
        { success: false, error: `HTTP error! status: ${response.status}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json({ success: true, results: data });

  } catch (error) {
    console.error("Error fetching data from Flask app:", error);
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}
