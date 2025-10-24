import { useEffect, useState } from "react";
import { getGenres } from "../../../_services/genres";
import { getAuthors } from "../../../_services/authors";
import { useNavigate } from "react-router-dom";
import { createBook } from "../../../_services/books";

export default function BookCreate() {
  const [genres, setGenres] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    price: 0,
    stock: 0,
    genre_id: "",
    author_id: "",
    cover_photo: null,
    description: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const [genresData, authorsData] = await Promise.all([
        getGenres(),
        getAuthors(),
      ]);
      setGenres(genresData);
      setAuthors(authorsData);
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "cover_photo") {
      setFormData({ ...formData, cover_photo: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = new FormData();
      for (const key in formData) {
        payload.append(key, formData[key]);
      }

      await createBook(payload);
      navigate("/admin/books");
    } catch (error) {
      console.log(error);
      alert("Error creating book");
    }
  };

  return (
    <section className="min-h-screen bg-gray-50 dark:bg-gray-900 flex justify-center items-center py-10 px-4">
      <div className="w-full max-w-3xl bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
        <h2 className="mb-6 text-2xl font-bold text-center text-gray-900 dark:text-white">
          Create New Book
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-2">
            {/* Title */}
            <div className="sm:col-span-2">
              <label
                htmlFor="title"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Title
              </label>
              <input
                type="text"
                name="title"
                id="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Book Title"
                required
                className="w-full p-2.5 rounded-lg border border-gray-300 bg-gray-50 text-sm text-gray-900 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>

            {/* Price */}
            <div>
              <label
                htmlFor="price"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Price
              </label>
              <input
                type="number"
                name="price"
                id="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="e.g. 150000"
                required
                className="w-full p-2.5 rounded-lg border border-gray-300 bg-gray-50 text-sm text-gray-900 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>

            {/* Stock */}
            <div>
              <label
                htmlFor="stock"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Stock
              </label>
              <input
                type="number"
                name="stock"
                id="stock"
                value={formData.stock}
                onChange={handleChange}
                placeholder="e.g. 20"
                required
                className="w-full p-2.5 rounded-lg border border-gray-300 bg-gray-50 text-sm text-gray-900 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>

            {/* Genre */}
            <div>
              <label
                htmlFor="genre_id"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Genre
              </label>
              <select
                id="genre_id"
                name="genre_id"
                value={formData.genre_id}
                onChange={handleChange}
                className="w-full p-2.5 rounded-lg border border-gray-300 bg-gray-50 text-sm text-gray-900 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              >
                <option value="">-- Select Genre --</option>
                {genres.map((genre) => (
                  <option key={genre.id} value={genre.id}>
                    {genre.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Author */}
            <div>
              <label
                htmlFor="author_id"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Author
              </label>
              <select
                id="author_id"
                name="author_id"
                value={formData.author_id}
                onChange={handleChange}
                className="w-full p-2.5 rounded-lg border border-gray-300 bg-gray-50 text-sm text-gray-900 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              >
                <option value="">-- Select Author --</option>
                {authors.map((author) => (
                  <option key={author.id} value={author.id}>
                    {author.name}
                  </option>
                ))}
              </select>
            </div>

             <div className="w-full">
                <label
                  for="photo"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Cover Photo
                </label>
                <input
                  type="file"
                  name="cover_photo"
                  id="cover_photo"
                  accept="image/*"
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full cursor-pointer dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                  placeholder="e.g 1"
                  required
                />
              </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="description"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="6"
                placeholder="Write a description of the book..."
                className="w-full p-2.5 rounded-lg border border-gray-300 bg-gray-50 text-sm text-gray-900 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
          </div>

          <div className="flex justify-center space-x-4 pt-4">
            <button
              type="submit"
              className="text-white bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:ring-indigo-300 font-medium rounded-lg text-sm px-6 py-2.5"
            >
              Create Book
            </button>
            <button
              type="reset"
              className="text-gray-700 border border-gray-500 hover:bg-gray-600 hover:text-white font-medium rounded-lg text-sm px-6 py-2.5"
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
