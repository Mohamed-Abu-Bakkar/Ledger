import React, { useState, useEffect } from "react";
import { api } from "../api";
import { Link } from "react-router-dom";

const LorryService = () => {
  const [lorryServices, setLorryServices] = useState([]);
  const [search, setSearch] = useState("");
  const [service, setService] = useState({
    serviceName: "",
    services: "",
    phoneNumber: "",
  });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchLorryServices();
  }, []);

  const fetchLorryServices = async () => {
    try {

      const res = await api.get("/lorryservices");
      setLorryServices(res.data);
    } catch (err) {
      console.error(err);
      alert("Error fetching lorry services.");
    }
  };

  const handleServiceChange = (field, value) => {
    setService({ ...service, [field]: value });
  };

  const handleEdit = (service) => {
    setEditId(service._id);
    setService({
      serviceName: service.serviceName || "",
      services: Array.isArray(service.services)
        ? service.services.join(", ")
        : service.services || "",
      phoneNumber: service.phoneNumber || "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!service.serviceName || !service.services) {
        alert("Please fill all fields.");
        return;
      }
      const payload = {
        ...service,
        services: service.services
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
      };
      if (editId) {
        await api.put(`/lorryservices/${editId}`, payload);
        alert("Service updated successfully!");
        setEditId(null);
      } else {
        await api.post("/lorryservices", payload);
        alert("Service added successfully!");
      }
      setService({
        serviceName: "",
        services: "",
        phoneNumber: "",
      });
      await fetchLorryServices();
    } catch (err) {
      console.error(err);
      alert("Error saving service.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white min-w-screen">
      <div className="absolute top-6 left-6 z-20">
        <Link
          to="/"
          className="bg-green-300 hover:bg-green-800 text-green-50 px-5 py-2 rounded-lg font-semibold shadow transition"
        >
          🏠 Home
        </Link>
      </div>
      <div className="min-h-screen flex flex-col items-center justify-start bg-green-100 w-full px-2 sm:px-0">
        <h2 className="text-3xl font-extrabold mb-8 text-green-900 tracking-tight text-center">
          Add New Lorry Service
        </h2>
        <div className="p-4 sm:p-8 bg-green-200 rounded-2xl shadow-xl border border-green-400 w-full max-w-3xl mx-auto">
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                placeholder="Lorry Service Name"
                value={service.serviceName}
                onChange={(e) =>
                  handleServiceChange("serviceName", e.target.value)
                }
                className="w-full p-3 border border-green-400 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-green-600 transition outline-none bg-green-50 text-green-900 placeholder-green-700 shadow-sm"
              />
              <input
                type="text"
                placeholder="Services (comma separated)"
                value={service.services}
                onChange={(e) =>
                  handleServiceChange("services", e.target.value)
                }
                className="w-full p-3 border border-green-400 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-green-600 transition outline-none bg-green-50 text-green-900 placeholder-green-700 shadow-sm"
              />
              <input
                type="text"
                placeholder="Phone Number"
                value={service.phoneNumber}
                onChange={(e) =>
                  handleServiceChange("phoneNumber", e.target.value)
                }
                className="w-full p-3 border border-green-400 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-green-600 transition outline-none bg-green-50 text-green-900 placeholder-green-700 shadow-sm"
              />
            </div>
            <div className="flex justify-center items-center gap-4 mt-6">
              <button
                type="submit"
                className="bg-green-700 hover:bg-green-800 text-green-50 px-8 py-3 rounded-lg font-semibold shadow-md transition w-full sm:w-auto"
              >
                {editId ? "Update" : "Save it"}
              </button>
              {editId && (
                <button
                  type="button"
                  className="bg-gray-400 hover:bg-gray-500 text-white px-6 py-3 rounded-lg font-semibold shadow-md transition w-full sm:w-auto"
                  onClick={() => {
                    setEditId(null);
                    setService({
                      serviceName: "",
                      services: "",
                      phoneNumber: "",
                    });
                  }}
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>
        <div className="mt-8 bg-green-300 rounded-xl p-4 sm:p-6 border border-green-400 shadow-sm w-full max-w-xl mx-auto">
          <h3 className="text-2xl font-bold text-green-900 mb-4">
            Search Services
          </h3>
          <input
            type="text"
            placeholder="Search by service name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full p-4 rounded-xl border border-green-400 shadow-md outline-none focus:ring-2 focus:ring-green-400 text-lg bg-green-50 text-green-900 placeholder-green-700"
          />
          <div className="mt-6 space-y-4">
            {lorryServices
              .filter((service) =>
                service.serviceName.toLowerCase().includes(search.toLowerCase())
              )
              .map((service, idx) => (
                <div
                  key={idx}
                  className="relative border border-green-300 rounded-2xl p-6 shadow-lg bg-green-50 w-full hover:shadow-2xl transition-shadow duration-300"
                >
                  <p className="font-bold text-xl text-green-800 mb-2">
                    {service.serviceName}
                  </p>
                  <p className="text-base text-green-700">
                    {Array.isArray(service.services)
                      ? service.services.join(", ")
                      : service.services}
                  </p>
                  <p className="text-base text-green-700">
                    Phone: {service.phoneNumber}
                  </p>
                  <div className="absolute top-4 right-4 flex flex-col items-end">
                    <button
                      className="mt-2"
                      onClick={() => handleEdit(service)}
                    >
                      Edit
                    </button>
                    <button
                      className="mt-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-semibold shadow ml-2"
                      onClick={async () => {
                        if (
                          window.confirm(
                            "Are you sure you want to delete this service?"
                          )
                        ) {
                          try {
                            await api.delete(`/lorryservices/${service._id}`);
                            fetchLorryServices();
                          } catch (err) {
                            alert("Error deleting service.");
                          }
                        }
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LorryService;
