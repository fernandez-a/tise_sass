"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShieldCheck, RefreshCcw } from "lucide-react";
// This should ideally be added to your _document.js or _app.js
// but for simplicity, I'll just show it here as part of the example

export default function CaptchaHarvesterCard() {
  const [iframeSrc, setIframeSrc] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleButtonClick = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/harvest");
      const data = await res.json();
      console.log(data)
      // if (data.success && data.iframeSrc) {
      //   setIframeSrc(data.iframeSrc);
      // } else {
      //   setError("Failed to load CAPTCHA. Please try again.");
      // }
    } catch (error) {
      console.error("Error fetching CAPTCHA iframe:", error);
      setError("An error occurred while loading the CAPTCHA.");
    }
    setLoading(false);
  };

  return (
    <>
      <Card className="w-full max-w-md mx-auto shadow-xl rounded-2xl p-4 bg-white">
        <CardContent className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Login</h2>
            <ShieldCheck className="text-green-500" />
          </div>
          {error && <div className="text-red-500 text-sm">{error}</div>}
          <div className="flex justify-between mt-2">
            <Button
              onClick={handleButtonClick}
              disabled={loading}
              className="flex items-center gap-2"
            >
              <RefreshCcw size={16} /> {loading ? "Loading..." : "Open CAPTCHA"}
            </Button>
          </div>

        </CardContent>
      </Card>
    </>
  );
}
