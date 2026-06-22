import { categories } from "../constants/categories";

export default function CategoryFilter({
  selectedCategory,
  setSelectedCategory,
}) {
  return (
    <select
      value={selectedCategory}
      onChange={(e) => setSelectedCategory(e.target.value)}
      className="border rounded-lg px-4 py-2"
    >
      {categories.map((category) => (
        <option key={category}>
          {category}
        </option>
      ))}
    </select>
  );
}