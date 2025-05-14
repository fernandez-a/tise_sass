"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "../ui/button";
import useSocket from "@/hooks/useSocket";
import { mapProduct } from "@/utils/productMapping"; // Import the mapping function
import { Product } from "@/types/product"; // Import the Product type
import { toast } from "sonner";

export default function ProductList() {
  const [products, setProducts] = useState<Product[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const socket = useSocket("http://localhost:5000");

  useEffect(() => {
    const fetchInitialProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch("/api/monitor");
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data = await res.json();
        if (Array.isArray(data.results)) {
          const mapped = data.results.map(mapProduct);
          setProducts(mapped);
        } else {
          setError("Invalid initial data format");
        }
      } catch (err: any) {
        console.error("Fetch error:", err);
        setError("Failed to load initial products.");
      } finally {
        setLoading(false);
      }
    };

    fetchInitialProducts();
  }, []);
  
  useEffect(() => {
    if (!socket) return;

    const handleNewProduct = (rawNewProduct: any) => {
      console.log("WebSocket event 'new_product' received!");
      const newProduct = mapProduct(rawNewProduct);
      setProducts((prevProducts) => {
        if (prevProducts) {
          return [newProduct, ...prevProducts];
        } else {
          return [newProduct];
        }
      });
      console.log('New product received via WebSocket:', newProduct);
    };

    socket.on('new_product', (data) => {
      toast("New Product", {
        description: `${data.title} product was just added.`
      });
      handleNewProduct(data)
    });

    return () => {
      socket.off('new_product', handleNewProduct);
    };
  }, [socket, setProducts]);
  return (
    <div className="w-full max-w-md mx-auto space-y-4 px-2 pb-4">
      {loading && !products ? (
        <Card key='loading_card' className="w-full shadow-xl rounded-2xl p-4 bg-white">
          <CardContent>Loading initial products...</CardContent>
        </Card>
      ) : products && products.length > 0 ? (
        products.map((product) => (
          <Card key={product.id} className="rounded-xl shadow-md p-4 bg-white">
            <CardContent>
              <div className="grid grid-cols-3 gap-2 items-center">
                <div className="col-span-2">
                  <img
                    src={product.photos[0]?.url}
                    alt={product.title}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                </div>
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
              <div className="mt-4 text-left">
                <p className="text-gray-500 text-sm">{product.brand}</p>
                <h3 className="font-semibold text-lg">{product.title}</h3>
                <p className="text-gray-800 font-bold">
                  {product.price_numeric} {product.currency}
                </p>
                <p className="text-xs text-gray-500 capitalize">
                  {product.condition.replace("_", " ")}
                </p>
                <p className="text-xs text-gray-500 capitalize">
                  {product.updated_at}
                </p>
                <div className="mt-3 flex space-x-2">
                  <Button variant="outline">Like</Button>
                  <Button>Buy</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))
      ) : (
        <p className="text-center text-gray-500">No products available.</p>
      )}
    </div>
  );
}