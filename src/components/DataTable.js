import React, { useEffect, useState } from "react";
import axios from "axios";

const DataTable = () => {
  const [submissions, setSubmissions] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSubmission, setSelectedSubmission] = useState(null);

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const response = await axios.get("https://backend-21ho.onrender.com/");
        console.log(response.data);
        setSubmissions(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchSubmissions();
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`https://backend-21ho.onrender.com/${id}`)
      .then((response) => console.log(response.data))
      .then(
        setSubmissions(
          submissions.filter((submission) => submission._id !== id)
        )
      )
      .catch((error) => console.error(error));
  };

  const openModal = (submission) => {
    setSelectedSubmission(submission);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedSubmission(null);
  };

  const handleUpdate = async (updatedData) => {
    try {
      const response = await axios.put(
        `https://backend-21ho.onrender.com/${updatedData._id}`,
        updatedData
      );
      console.log(response.data);
      setSubmissions(
        submissions.map((submission) =>
          submission._id === updatedData._id ? updatedData : submission
        )
      );
      setIsModalOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-10/12 mx-auto my-4 p-4">
      <h2 className="text-xs text-center text-indigo-500 tracking-widest font-medium title-font mb-1">
        DATA
      </h2>
      <h1 className=" text-center text-2xl font-medium title-font mb-4 text-gray-900">
        All Users List
      </h1>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg border-t-2">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr className="bg-blue-600 text-white">
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Date
              </th>
              <th scope="col" className="px-6 py-3">
                Description
              </th>
              <th scope="col" className="px-6 py-3">
                Gender
              </th>
              <th scope="col" className="px-6 py-3">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {submissions.map((submission, index) => (
              <tr
                key={submission._id}
                className={`bg-white dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 ${
                  index % 2 !== 0 ? 'bg-gray-200' : ''
                }`}
              >
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {submission.name}
                </td>
                <td className="px-6 py-4">{submission.date}</td>
                <td className="px-6 py-4">{submission.description}</td>
                <td className="px-6 py-4">{submission.gender}</td>
                <td className="flex items-center px-6 py-4">
                  <button
                    onClick={() => openModal(submission)}
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(submission._id)}
                    className="font-medium text-red-600 dark:text-red-500 hover:underline ml-3"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 w-full flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white w-1/3 p-8 rounded shadow-lg">
            <h2 className="text-lg font-medium mb-4">Edit Submission</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleUpdate(selectedSubmission);
              }}
            >
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="name"
                >
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  value={selectedSubmission.name}
                  onChange={(e) =>
                    setSelectedSubmission({
                      ...selectedSubmission,
                      name: e.target.value,
                    })
                  }
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="date"
                >
                  Date
                </label>
                <input
                  id="date"
                  type="text"
                  value={selectedSubmission.date}
                  onChange={(e) =>
                    setSelectedSubmission({
                      ...selectedSubmission,
                      date: e.target.value,
                    })
                  }
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="description"
                >
                  Description
                </label>
                <input
                  id="description"
                  type="text"
                  value={selectedSubmission.description}
                  onChange={(e) =>
                    setSelectedSubmission({
                      ...selectedSubmission,
                      description: e.target.value,
                    })
                  }
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="gender"
                >
                  Gender
                </label>
                <input
                  id="gender"
                  type="text"
                  value={selectedSubmission.gender}
                  onChange={(e) =>
                    setSelectedSubmission({
                      ...selectedSubmission,
                      gender: e.target.value,
                    })
                  }
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="flex items-center justify-between">
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Update
                </button>
                <button
                  type="button"
                  onClick={closeModal}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataTable;
