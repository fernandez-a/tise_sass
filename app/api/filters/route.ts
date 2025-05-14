import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const brand = searchParams.get("brand");

    console.log("Brand received:", brand);

    // // Optional: Forward this to your Flask backend
    const response = await fetch(`http://127.0.0.1:5000/api/get_brand_id?brand=${encodeURIComponent(brand || "")}`);

    if (!response.ok) {
      console.error(`Failed to fetch data from Flask app: ${response.status}`);
      return NextResponse.json(
        { success: false, error: `HTTP error! status: ${response.status}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    console.log(data)
    return NextResponse.json({ success: true, results: data });

  } catch (error) {
    console.error("Error fetching data from Flask app:", error);
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}
