import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { showGenre, updateGenre, deleteGenre } from "../../../_services/genres";

export default function GenreEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    _method: "PUT",
  });

  useEffect(() => {
    const fetchData = async () => {
      const genreData = await showGenre(id);
      setFormData({
        name: genreData.name || "",
        description: genreData.description || "",
        _method: "PUT",
      });
    };
    fetchData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateGenre(id, formData);
      navigate("/admin/genres");
    } catch (error) {
      console.error(error);
      alert("Error updating genre");
    }
  };

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this genre?")) {
      try {
        await deleteGenre(id);
        navigate("/admin/genres");
      } catch (error) {
        console.error(error);
        alert("Failed to delete genre");
      }
    }
  };

  return (
    <section className="min-h-screen bg-gray-50 dark:bg-gray-900 flex justify-center items-center py-10 px-4">
      <div className="w-full max-w-2xl bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
        <h2 className="mb-6 text-2xl font-bold text-center text-gray-900 dark:text-white">
          Edit Genre
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-2.5 rounded-lg border border-gray-300 bg-gray-50 text-sm text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
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
              rows="5"
              className="w-full p-2.5 rounded-lg border border-gray-300 bg-gray-50 text-sm text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>

          <div className="flex justify-between pt-4">
            <button
              type="submit"
              className="text-white bg-indigo-700 hover:bg-indigo-800 font-medium rounded-lg text-sm px-6 py-2.5"
            >
              Save Changes
            </button>
            <button
              type="button"
              onClick={handleDelete}
              className="text-white bg-red-600 hover:bg-red-700 font-medium rounded-lg text-sm px-6 py-2.5"
            >
              Delete
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
