"use client";

import { useEffect, useState } from "react";
import { API } from "../services/api";

import Header from "../components/Header";
import ProductCard from "../components/ProductCard";
import CategoryFilter from "../components/CategoryFilter";
import LoadMoreButton from "../components/LoadMoreButton";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [nextCursor, setNextCursor] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch first page
  useEffect(() => {
    fetchProducts(true);
  }, [selectedCategory]);

  const fetchProducts = async (reset = false) => {
    try {
      setLoading(true);

      let url = "/products";

      const params = [];

      if (selectedCategory !== "All") {
        params.push(`category=${selectedCategory}`);
      }

      if (!reset && nextCursor) {
        params.push(
          `cursorCreatedAt=${nextCursor.createdAt}`
        );

        params.push(
          `cursorId=${nextCursor.id}`
        );
      }

      if (params.length > 0) {
        url += `?${params.join("&")}`;
      }

      const response = await API.get(url);

      if (reset) {
        setProducts(response.data.products);
      } else {
        setProducts((prev) => [
          ...prev,
          ...response.data.products,
        ]);
      }

      setNextCursor(response.data.nextCursor);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
   <main className="min-h-screen bg-slate-100 p-8">
      <div className="max-w-6xl mx-auto">

        <Header />

        <div className="mb-8 flex justify-center">
          <CategoryFilter
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
            />
          ))}
        </div>

        {nextCursor && (
          <div className="flex justify-center mt-10">
            <LoadMoreButton
              onClick={() => fetchProducts()}
            />
          </div>
        )}

        {loading && (
          <p className="text-center mt-5">
            Loading...
          </p>
        )}
      </div>
    </main>
  );
}