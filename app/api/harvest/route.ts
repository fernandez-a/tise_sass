import { NextResponse } from "next/server";
import puppeteer from "puppeteer";

export async function GET() {
  let browser = null;
  try {
    const width = 480;
    const height = 750;

    // Launch the first browser instance for login
    browser = await puppeteer.launch({
      headless: false,
      args: [`--window-size=${width},${height}`],
      defaultViewport: {
        width,
        height,
        isMobile:true
      },
    });

    const page = await browser.newPage();
    await page.goto("https://tise.com/");

    // Handle cookie consent
    try {
      const cookieButton = await page.waitForSelector(
        '::-p-xpath(//*[@id="body"]/div[6]/div/div/div/div/div[2]/div/button[2])',
        { timeout: 5000 }
      );
      await cookieButton?.click();
    } catch (error) {
      console.log("Cookie consent button not found or not needed.");
    }

    // Click login button
    const loginButton = await page.waitForSelector(
      "::-p-xpath(/html/body/div[1]/nav/div[2]/div[3]/div/div[2]/button)"
    );
    await loginButton?.click();

    // // Enter credentials
    // await page.waitForSelector('input[name="emailOrPhone"]');
    // await page.type('input[name="emailOrPhone"]', "phone");

    // await page.waitForSelector('input[name="password"]');
    // await page.type('input[name="password"]', "password");

    // // Click submit
    // const submitButton = await page.waitForSelector(
    //   'button[data-testid="submit-button"]'
    // );
    // await submitButton?.click();

    await page.waitForSelector('iframe[src*="recaptcha"]');
    const profilePassSelector =
      "::-p-xpath(/html/body/div[1]/nav/div[2]/div[3]/div/div[5]/a/div/div)";
    await page.waitForSelector(profilePassSelector, { timeout: 90000 });
    const cooki_log = await browser.cookies();

    // Return the response BEFORE closing the browser (or after if you don't need the browser anymore)
    await browser.close();
    return NextResponse.json({ success: true, cookies: cooki_log });

  } catch (error) {
    console.log(error);
    // You should also return an error response here
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}