import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addBook, fetchAllBooks } from "../store/slices/book.slice";
import { toggleAddBookPopup } from "../store/slices/popUp.slice";

const AddBookPopup = () => {
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [rentalPrice, setRentalPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [publicationYear, setPublicationYear] = useState("");
  const [edition, setEdition] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleAddBook = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("author", author);
    formData.append("description", description);
    formData.append("rentalPrice", rentalPrice);
    formData.append("category", category);
    formData.append("quantity", quantity);
    formData.append("publicationYear", publicationYear);
    formData.append("edition", edition);
    if (image) formData.append("image", image);

    dispatch(addBook(formData));
    dispatch(fetchAllBooks());
  };

  return (
    <div className="fixed inset-0 bg-black/30 p-5 flex items-center justify-center z-50 overflow-y-auto">
      <div className="w-full max-w-3xl bg-white rounded-lg shadow-lg">
        {/* Header */}
        <div className="flex justify-between items-center bg-black text-white px-6 py-4 rounded-t-lg">
          <h2 className="text-lg font-bold">Add New Book</h2>
          <button
            onClick={() => dispatch(toggleAddBookPopup())}
            className="text-2xl font-bold hover:text-red-500"
          >
            &times;
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleAddBook} className="p-6">
          {/* Top Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Image Preview + Upload */}
            <div className="flex flex-col items-center sm:items-start gap-3">
              <label className="block text-gray-700 font-semibold">
                Book Cover Image
              </label>
              {preview && (
                <img
                  src={preview}
                  alt="preview"
                  className="w-36 h-36 object-cover rounded shadow"
                />
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="block w-full text-sm border border-gray-300 rounded px-3 py-2 bg-gray-100"
              />
            </div>

            {/* Top Right Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                  Rental Price
                </label>
                <input
                  type="number"
                  value={rentalPrice}
                  onChange={(e) => setRentalPrice(e.target.value)}
                  required
                  className="w-full border border-gray-300 rounded px-4 py-2 bg-gray-100"
                />
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
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

            <div className="sm:col-span-2">
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
          </div>

          {/* Submit Button */}
          <div className="border-t pt-4 border-gray-200">
            <button
              type="submit"
              className="w-full bg-black text-white font-semibold py-2 rounded-lg hover:bg-gray-300 hover:text-black transition duration-200"
            >
              Add Book
            </button>
          </div>
        </form>
      </div>
    </div>
  );
  
};

export default AddBookPopup;
