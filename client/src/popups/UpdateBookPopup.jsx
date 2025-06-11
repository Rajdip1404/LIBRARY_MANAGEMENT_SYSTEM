import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateBook, fetchAllBooks } from "../store/slices/book.slice";
import { toggleUpdateBookPopup } from "../store/slices/popUp.slice";

const UpdateBookPopup = ({ book }) => {
  const dispatch = useDispatch();

  const [bookId, setBookId] = useState("");
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [rentalPrice, setRentalPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [publicationYear, setPublicationYear] = useState("");
  const [edition, setEdition] = useState("");

  useEffect(() => {
    if (book) {
      setBookId(book._id || "");
      setTitle(book.title || "");
      setAuthor(book.author || "");
      setDescription(book.description || "");
      setRentalPrice(book.rentalPrice || "");
      setCategory(book.category || "");
      setQuantity(book.quantity || "");
      setPublicationYear(book.publicationYear || "");
      setEdition(book.edition || "");
    }
  }, [book]);

  const handleUpdateBook = (e) => {
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

    console.log(book._id);
    dispatch(updateBook( bookId, formData )).then(
      () => {
        dispatch(fetchAllBooks());
        dispatch(toggleUpdateBookPopup());
      }
    );
  };

  return (
    <div className="fixed inset-0 bg-black/30 p-5 flex items-center justify-center z-50">
      <div className="w-11/12 bg-white rounded-lg shadow-lg sm:w-2/3 lg:w-1/2">
        <div className="flex justify-between items-center bg-black text-white px-6 py-4 rounded-t-lg">
          <h2 className="text-lg font-bold">Update Book</h2>
          <button
            onClick={() => dispatch(toggleUpdateBookPopup())}
            className="text-2xl text-center transition duration-300 hover:cursor-pointer font-bold"
          >
            &times;
          </button>
        </div>

        <form
          onSubmit={handleUpdateBook}
          className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-gray-100"
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
              className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-gray-100"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-gray-700 font-semibold mb-1">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-gray-100 resize-none"
              rows={3}
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
              className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-gray-100"
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
              className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-gray-100"
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
              className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-gray-100"
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
              className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-gray-100"
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
              className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-gray-100"
            />
          </div>

          <div className="sm:col-span-2 flex justify-end mt-4 border-t pt-4 border-gray-200">
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
