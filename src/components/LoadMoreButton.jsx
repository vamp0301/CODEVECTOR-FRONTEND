export default function LoadMoreButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
    >
      Load More
    </button>
  );
}