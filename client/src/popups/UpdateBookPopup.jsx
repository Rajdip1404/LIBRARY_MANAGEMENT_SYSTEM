import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateBook, fetchAllBooks } from "../store/slices/book.slice";
import { toggleUpdateBookPopup } from "../store/slices/popup.slice";

const UpdateBookPopup = ({ book }) => {
  const dispatch = useDispatch();

  const [bookId, setBookId] = useState("");
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [rentalPrice, setRentalPrice] = useState({
    7: "",
    14: "",
    21: "",
    28: "",
  });
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [publicationYear, setPublicationYear] = useState("");
  const [edition, setEdition] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (book) {
      setBookId(book._id || "");
      setTitle(book.title || "");
      setAuthor(book.author || "");
      setDescription(book.description || "");
      setRentalPrice(book.rentalPrice || { 7: "", 14: "", 21: "", 28: "" });
      setCategory(book.category || "");
      setQuantity(book.quantity || "");
      setPublicationYear(book.publicationYear || "");
      setEdition(book.edition || "");
      setPreview(book.bookImage?.url || book.image?.url || null);
    }
  }, [book]);

  const handleRentalPriceChange = (days, value) => {
    setRentalPrice((prev) => ({ ...prev, [days]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleUpdateBook = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("author", author);
    formData.append("description", description);
    formData.append("rentalPrice", JSON.stringify(rentalPrice));
    formData.append("category", category);
    formData.append("quantity", quantity);
    formData.append("publicationYear", publicationYear);
    formData.append("edition", edition);
    if (image) formData.append("image", image);

    dispatch(updateBook(bookId, formData)).then(() => {
      dispatch(fetchAllBooks());
      dispatch(toggleUpdateBookPopup());
    });
  };

  return (
    <div className="fixed inset-0 bg-black/30 p-5 flex items-center justify-center z-50 overflow-y-auto">
      <div className="w-full max-w-3xl bg-white rounded-lg shadow-lg">
        <div className="flex justify-between items-center bg-black text-white px-6 py-4 rounded-t-lg">
          <h2 className="text-lg font-bold">Update Book</h2>
          <button
            onClick={() => dispatch(toggleUpdateBookPopup())}
            className="text-2xl font-bold hover:text-red-500"
          >
            &times;
          </button>
        </div>

        <form onSubmit={handleUpdateBook} className="px-6 py-4 space-y-3">
          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full border border-gray-300 rounded px-4 py-2 bg-gray-100"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="w-full border border-gray-300 rounded px-4 py-2 bg-gray-100 resize-none"
              rows={3}
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-2">
            {/* Image Preview and Upload */}
            <div className="flex flex-col items-center sm:items-start w-full sm:w-1/3 gap-2">
              <label className="block text-gray-700 font-semibold">
                Book Cover Image
              </label>
              <div
                className="w-40 h-40 border border-gray-400 bg-gray-100 rounded flex items-center justify-center cursor-pointer relative overflow-hidden"
                onClick={() =>
                  document.getElementById("updateBookImageInput").click()
                }
              >
                {preview ? (
                  <img
                    src={preview}
                    alt={title}
                    className="w-full h-full object-fit p-2"
                  />
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-10 h-10 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 16V4m0 0L3 8m4-4l4 4M17 8v8m0 0l-4-4m4 4l4-4"
                    />
                  </svg>
                )}
                <input
                  id="updateBookImageInput"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </div>
            </div>

            {/* Author, Category, Edition, Year */}
            <div className="w-full sm:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-semibold mb-1">
                  Author
                </label>
                <input
                  type="text"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  required
                  className="w-full border border-gray-300 rounded px-4 py-2 bg-gray-100"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-1">
                  Category
                </label>
                <input
                  type="text"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                  className="w-full border border-gray-300 rounded px-4 py-2 bg-gray-100"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-1">
                  Edition
                </label>
                <input
                  type="text"
                  value={edition}
                  onChange={(e) => setEdition(e.target.value)}
                  required
                  className="w-full border border-gray-300 rounded px-4 py-2 bg-gray-100"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-1">
                  Publication Year
                </label>
                <input
                  type="number"
                  value={publicationYear}
                  onChange={(e) => setPublicationYear(e.target.value)}
                  required
                  className="w-full border border-gray-300 rounded px-4 py-2 bg-gray-100"
                />
              </div>
            </div>
          </div>

          {/* Quantity & Rental Price */}
          <div className="grid gap-4">
            <div>
              <label className="block text-gray-700 font-semibold mb-1">
                Quantity
              </label>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                required
                className="w-full border border-gray-300 rounded px-4 py-2 bg-gray-100"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Rental Price (per duration)
              </label>
              <div className="flex flex-wrap gap-4">
                {["7", "14", "21", "28"].map((day) => (
                  <div
                    key={day}
                    className="w-full sm:w-[calc(50%-0.5rem)] lg:w-[calc(25%-0.75rem)] flex items-center gap-2"
                  >
                    <span className="w-8">{day}d:</span>
                    <input
                      type="number"
                      value={rentalPrice[day]}
                      onChange={(e) =>
                        handleRentalPriceChange(day, e.target.value)
                      }
                      required
                      placeholder={`₹ for ${day}d`}
                      className="flex-1 border border-gray-300 w-10 rounded px-3 py-1 bg-gray-100"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="border-t pt-4 border-gray-200">
            <button
              type="submit"
              className="w-full bg-black text-white font-semibold py-2 rounded-lg hover:bg-gray-300 hover:text-black transition duration-200"
            >
              Update Book
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateBookPopup;
