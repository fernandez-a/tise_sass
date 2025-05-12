"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "../ui/button";

interface Product {
  id: string;
  title: string;
  brand: string;
  condition: string;
  currency: string;
  price_numeric: number;
  photos: {
    url: string;
    type: string;
  }[];
}

export default function ProductList() {
  const [products, setProducts] = useState<Product[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch("/api/monitor");
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data = await res.json();
        if (data.success && Array.isArray(data.results)) {
          // Log the number of products received from the API
          console.log("Number of products received:", data.results.length);
          setProducts(data.results as Product[]);
        } else {
          setError("Invalid data format");
        }
      } catch (err: any) {
        console.error("Fetch error:", err);
        setError("Failed to load products.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // if (loading) {
  //   return (
  //     <Card className="w-full max-w-md mx-auto shadow-xl rounded-2xl p-4 bg-white">
  //       <CardContent>Loading products...</CardContent>
  //     </Card>
  //   );
  // }

  if (error) {
    return (
      <Card className="w-full max-w-md mx-auto shadow-xl rounded-2xl p-4 bg-white">
        <CardContent>Error: {error}</CardContent>
      </Card>
    );
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-4 px-2">
      {loading ? (
        <Card className="w-full shadow-xl rounded-2xl p-4 bg-white">
          <CardContent>Loading products...</CardContent>
        </Card>
      ) : products && products.length > 0 ? (
        products.map((product) => {
          return (
            <Card key={product.id} className="rounded-xl shadow-md p-4 bg-white">
              <CardContent>
                <div className="grid grid-cols-3 gap-2 items-center">
                  {/* Main Image (left 2 columns) */}
                  <div className="col-span-2">
                    <img
                      src={product.photos[0]?.url}
                      alt={product.title}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  </div>

                  {/* Two thumbnails stacked vertically */}
                  <div className="flex flex-col items-center justify-center space-y-2">
                    {product.photos.slice(2, 4).map((photo, index) => (
                      <img
                        key={index}
                        src={photo.url}
                        alt={`thumb-${index}`}
                        className="w-20 h-20 object-cover rounded-md"
                      />
                    ))}
                  </div>
                </div>

                {/* Details below */}
                <div className="mt-4 text-left">
                  <p className="text-gray-500 text-sm">{product.brand}</p>
                  <h3 className="font-semibold text-lg">{product.title}</h3>
                  <p className="text-gray-800 font-bold">
                    {product.price_numeric} {product.currency}
                  </p>
                  <p className="text-xs text-gray-500 capitalize">{product.condition.replace('_', ' ')}</p>

                  {/* Action buttons (optional) */}
                  <div className="mt-3 flex space-x-2">
                    <Button variant="outline">Like</Button>
                    <Button>Buy</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })
      ) : (
        <p className="text-center text-gray-500">No products available.</p>
      )}
    </div>
  );
}