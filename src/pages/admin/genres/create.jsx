import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createGenre } from "../../../_services/genres";

export default function GenreCreate() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createGenre(formData);
      navigate("/admin/genres");
    } catch (error) {
      console.error(error);
      alert("Failed to create genre");
    }
  };

  return (
    <section className="flex items-center justify-center min-h-[70vh] bg-white dark:bg-gray-900">
      <div className="w-full max-w-xl bg-white dark:bg-gray-800 shadow-lg rounded-xl px-8 py-10">
        <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white text-center">
          Create New Genre
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Genre Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="e.g. Fantasy"
            />
          </div>

          <div>
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
              rows="4"
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="Short description..."
            />
          </div>

          <div className="flex justify-center space-x-4">
            <button
              type="submit"
              className="text-white bg-indigo-700 hover:bg-indigo-800 font-medium rounded-lg text-sm px-6 py-2.5"
            >
              Create Genre
            </button>
            <button
              type="reset"
              className="text-gray-700 border border-gray-600 hover:bg-gray-600 hover:text-white font-medium rounded-lg text-sm px-6 py-2.5"
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
