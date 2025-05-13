import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaFileDownload } from "react-icons/fa";
import * as XLSX from "xlsx";
import "jspdf-autotable";



const Dashboard = () => {
  const [symptoms, setSymptoms] = useState([]);
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searcSymptom, setSearchSmptom] = useState(null);

  const handleStateResponse = (symptomId) => {
    navigate(`/response/${symptomId}`);
  };
  const fetchSymptoms = async () => {
    const res = await axios.get("http://localhost:4000/api/user/getsymptoms");
    return res.data.data || [];
  };

  const downloadExcel = async () => {
    try {
      const rawSymptoms = await fetchSymptoms();
  
      const formatted = rawSymptoms.map((item) => ({
        "Patient Name": item.fullName || "",
        "Email": item.email || "",
        "Gender": item.gender || "",
        "Age": item.age || "",
        "Nationality": item.nationality || "",
        "Quartier & Region": `${item.quartier || ""}, ${item.region || ""}`,
        "Symptoms": Array.isArray(item.howDoYouFeeling) ? item.howDoYouFeeling.join(", ") : item.howDoYouFeeling || "",
        "Duration of Illness": item.durationOfDiseases || "",
        "Session": item.session || "",
        "Other Services": Array.isArray(item.whichOtherSevicesDoYouWant)
          ? item.whichOtherSevicesDoYouWant.join(", ")
          : item.whichOtherSevicesDoYouWant || "",
        "Created At": item.createdAt
          ? new Date(item.createdAt).toLocaleString("en-US", {
              weekday: "short",
              year: "numeric",
              month: "short",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })
          : "",
      }));
  
      const worksheet = XLSX.utils.json_to_sheet(formatted);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Symptoms");
      XLSX.writeFile(workbook, "symptoms.xlsx");
    } catch (error) {
      console.error("Failed to download Excel:", error);
      alert("Failed to download Excel. Try again!");
    } finally {
      setLoading(false);
    }
  };
  const handleSelect = (item) => {
    setQuery(item.fullName || ""); 
    setSearchSmptom(item);
    setShowDropdown(false);
  };
  useEffect(() => {
    if (query.trim()) {
      const filtered = symptoms.filter((item) =>
        (item.fullName || "").toLowerCase().includes(query.toLowerCase())
      );
      setResults(filtered);
    } else {
      setResults([]);
    }
  }, [query, symptoms]);
  

  useEffect(() => {
    const fetchSymptoms = async () => {
      try {
        const res = await axios.get("http://localhost:4000/api/user/getsymptoms");
        setSymptoms(res.data.data);
      } catch (error) {
        console.error("Failed to fetch symptoms:", error);
      }
    };

    fetchSymptoms();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this symptom?")) return;

    try {
      await axios.delete(`http://localhost:4000/api/user/${id}`);
      setSymptoms((prev) => prev.filter((symptom) => symptom._id !== id));
    } catch (error) {
      console.error("Failed to delete symptom:", error);
      alert("Delete failed! Try again.");
    }
  };


  return (
    <div>
      <div className="p-4">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg bg-white">
          <div className="flex flex-col sm:flex-row sm:items-center items-stretch justify-between w-full gap-4 p-4">
            <div className="relative w-full sm:w-auto flex justify-center sm:justify-start">
              <button
                id="dropdownRadioButton"
                className="w-full sm:w-auto inline-flex justify-between items-center text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-3 py-2"
              >
                <span className="flex items-center">
                  <svg
                    className="w-3 h-3 text-gray-500 mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm3.982 13.982a1 1 0 0 1-1.414 0l-3.274-3.274A1.012 1.012 0 0 1 9 10V6a1 1 0 0 1 2 0v3.586l2.982 2.982a1 1 0 0 1 0 1.414Z" />
                  </svg>
                  {new Date().toLocaleDateString()}
                </span>
                <svg
                  className="w-2.5 h-2.5 ml-2"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </button>
            </div>
            <div className="relative w-full sm:w-auto flex justify-center sm:justify-end">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <svg
                  className="w-5 h-5 text-gray-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>

              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => {
                  if (results.length > 0) setShowDropdown(true);
                }}
                onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
                className="block w-full sm:w-80 p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Search for patients"
              />
              {loading && (
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <div className="animate-spin h-4 w-4 border-2 border-blue-500 rounded-full border-t-transparent"></div>
                </div>
              )}
              {error && (
                <div className="absolute top-full mt-1 w-full sm:w-80 bg-red-50 text-red-800 text-xs p-2 rounded border border-red-200">
                  {error}
                </div>
              )}

              {showDropdown && results.length > 0 && (
                <ul className="absolute top-full mt-1 w-full sm:w-80 bg-white border border-gray-200 rounded-lg shadow z-50 max-h-60 overflow-auto">
                  {results.map((item) => (
                    <li
                      key={item._id}
                      onClick={() => handleSelect(item)}
                      className="px-4 py-2 text-sm hover:bg-blue-100 cursor-pointer"
                    >
                      {item.fullName || item.name || item.howDoYouFeeling || "Unnamed symptom"}
                    </li>
                  ))}
                </ul>
              )}

              {showDropdown && query && results.length === 0 && !loading && (
                <div className="absolute top-full mt-1 w-full sm:w-80 bg-white border border-gray-200 rounded-lg shadow z-50 p-3 text-center text-gray-500">
                  No matching results found
                </div>
              )}
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-left text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th className="p-4">
                    <input
                      id="checkbox-all-search"
                      type="checkbox"
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded"
                    />
                  </th>
                  {[
                    "Patient names",
                    "Email",
                    "Gender",
                    "Age",
                    "Nationality",
                    "Quartier & Region",
                    "Symptoms",
                    "Duration of illness",
                    "Session",
                    "Other services",
                    "Date/Time",
                    "Delete",
                    "State Response",
                  ].map((title, i) => (
                    <th key={i} className="px-6 py-3 whitespace-nowrap">
                      {title}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {symptoms.map((item, index) => (
                  <tr key={index} className="bg-white border-b">
                    <td className="p-4">
                      <input
                        type="checkbox"
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">{item.fullName}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{item.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{item.gender}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{item.age}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{item.nationality}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {item.quartier}, {item.region}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {Array.isArray(item.howDoYouFeeling)
                        ? item.howDoYouFeeling.join(", ")
                        : item.howDoYouFeeling || "N/A"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">{item.durationOfDiseases}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{item.session}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {Array.isArray(item.whichOtherSevicesDoYouWant)
                        ? item.whichOtherSevicesDoYouWant.join(", ")
                        : item.whichOtherSevicesDoYouWant || "N/A"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                      {new Date(item.createdAt || Date.now()).toLocaleString("en-US", {
                        weekday: "short", year: "numeric", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit"
                      })}

                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-lg text-xs transition-all duration-200"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-4 h-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        Delete
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => handleStateResponse(item._id)}
                        className="flex items-center gap-1 bg-blue-500 hover:bg-blue-600 text-white px-3 py-1.5 rounded-lg text-xs transition-all duration-200"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-4 h-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-6h13M9 17l5-5-5-5" />
                        </svg>
                        Respond
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {symptoms.length === 0 && (
              <div className="p-4 text-center text-gray-400">No data available</div>
            )}
          </div>
        </div>
      </div>
      <div className="flex justify-center my-6">
        <button
          onClick={downloadExcel}
          className="flex items-center gap-2 bg-cyan-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300 disabled:opacity-50"
        >
          <FaFileDownload className="w-5 h-5" />
          Download Excel
        </button>
      </div>
    </div>
  );
};
export default Dashboard;
