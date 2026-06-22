export default function ProductCard({ product }) {
  return (
    <div className="bg-white border rounded-xl shadow-md p-5">
      <h2 className="text-xl font-semibold text-gray-900">
        {product.name}
      </h2>

      <p className="mt-2 text-gray-600">
        {product.category}
      </p>

      <p className="mt-4 text-blue-600 font-bold text-lg">
        ₹{product.price}
      </p>
    </div>
  );
}