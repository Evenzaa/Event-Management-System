import { useEffect, useState } from "react";
import Button from "../../components/common/Button";
import { authService } from "../../services/authService";

export default function EditProfile() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    profileImage: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        role: user.role || "",
        profileImage: user.profileImage || "",
      });
    }
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setMessage("");
    setError("");

    try {
      const res = await authService.updateProfile({
        name: formData.name,
        profileImage: formData.profileImage,
      });

      localStorage.setItem(
        "user",
        JSON.stringify(res.user)
      );

      setMessage("Profile updated successfully.");
    } catch (err) {
      setError(err.message || "Update failed.");
    } finally {
      setLoading(false);
    }
  };
    return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8F7FF] px-4 py-10">

      <div className="w-full max-w-2xl rounded-3xl bg-white shadow-xl border border-gray-100 p-8">

        <h1 className="text-3xl font-bold text-center mb-2">
          Edit Profile
        </h1>

        <p className="text-center text-gray-500 mb-8">
          Update your personal information
        </p>

        {message && (
          <div className="mb-4 rounded-xl border border-green-200 bg-green-50 p-3 text-green-700 text-sm">
            {message}
          </div>
        )}

        {error && (
          <div className="mb-4 rounded-xl border border-red-200 bg-red-50 p-3 text-red-600 text-sm">
            {error}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >

          <div className="flex justify-center">

            <img
              src={
                formData.profileImage ||
                "https://ui-avatars.com/api/?name=" +
                  encodeURIComponent(formData.name || "User")
              }
              alt="Profile"
              className="w-28 h-28 rounded-full object-cover border-4 border-violet-100"
            />

          </div>

          <div>

            <label className="block mb-2 text-sm font-medium">
              Profile Image URL
            </label>

            <input
              type="text"
              name="profileImage"
              value={formData.profileImage}
              onChange={handleChange}
              className="w-full rounded-2xl border border-gray-300 px-4 py-3 outline-none focus:border-violet-600"
              placeholder="https://example.com/avatar.jpg"
            />

          </div>

          <div>

            <label className="block mb-2 text-sm font-medium">
              Full Name
            </label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full rounded-2xl border border-gray-300 px-4 py-3 outline-none focus:border-violet-600"
              required
            />

          </div>

          <div className="grid grid-cols-2 gap-4">

            <div>

              <label className="block mb-2 text-sm font-medium">
                Email
              </label>

              <input
                type="email"
                value={formData.email}
                readOnly
                className="w-full rounded-2xl bg-gray-100 border border-gray-200 px-4 py-3"
              />

            </div>

            <div>

              <label className="block mb-2 text-sm font-medium">
                Role
              </label>

              <input
                type="text"
                value={formData.role}
                readOnly
                className="w-full rounded-2xl bg-gray-100 border border-gray-200 px-4 py-3 capitalize"
              />

            </div>

          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={loading}
          >
            {loading ? "Saving..." : "Save Changes"}
          </Button>

        </form>

      </div>

    </div>
  );
}