import { useEffect, useState } from "react";
import Employee from "./Employee";
import { useLoaderData } from "react-router-dom";

const Employees = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const { count } = useLoaderData();
  const itemsPerPage = 10;
  const numberOfPages = Math.ceil(count / itemsPerPage);

  const pages = [...Array(numberOfPages).keys()];

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  const handleNextPage = () => {
    if (currentPage < 9) {
      setCurrentPage(currentPage + 1);
    }
  };

  useEffect(() => {
    fetch(
      `http://localhost:5000/users?page=${currentPage}&size=${itemsPerPage}`
    )
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, [currentPage, itemsPerPage]);
  return (
    <div className="overflow-x-auto  border-2 w-full">
      <div className="m-8 border-2">
        <table className="table">
          <thead>
            <tr className="border-1">
              <th>Photo</th>
              <th>Full Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Date of birth</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <Employee key={user._id} user={user}></Employee>
            ))}
          </tbody>
        </table>
        <div className="flex justify-between mt-8 items-center p-4">
          <div>
            {
              (currentPage + 1) != numberOfPages ?<p>Showing {currentPage*10} to {(currentPage+1)*10} out of {count}</p>: <p>Showing {currentPage*10} to {(count)} out of {count}</p> 
            }
          </div>
          <div>
            <button onClick={handlePrevPage} className="border-2 px-4 py-2">
              Prev
            </button>
            {pages.map((page) => (
              <button
                onClick={() => setCurrentPage(page)}
                key={page}
                className="px-4 py-2 border-2"
              >
                {page+1}
              </button>
            ))}
            <button onClick={handleNextPage} className="border-2 px-4 py-2">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Employees;
