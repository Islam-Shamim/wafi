import { useEffect, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import User from "./User";
import { useLoaderData } from "react-router-dom";

const Home = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const { count } = useLoaderData();
  const itemsPerPage = 10;
  const numberOfPages = Math.ceil(count / itemsPerPage);

  // const pages = []
  // for(let i=0;i<numberOfPages;i++){
  //   pages.push(i)
  // }
  // console.log(pages)

  const pages = [...Array(numberOfPages).keys()];
  //console.log(pages);

  const handlePrevPage = () => {
    if (currentPage > 0) {
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
    <div className="w-full border-2">
      <div className="border-2 rounded p-2 m-10 flex items-center justify-around">
        <input
          type="text"
          placeholder="Name"
          className="input input-bordered max-w-xs"
        />
        <input
          type="email"
          placeholder="Email"
          className="input input-bordered max-w-xs"
        />
        <input
          type="date"
          placeholder="Date"
          className="input input-bordered max-w-xs"
        />
        <input
          type="text"
          placeholder="Phone"
          className="input input-bordered max-w-xs"
        />
        <button className="text-2xl">
          <IoSearchOutline />
        </button>
      </div>
      <div className="overflow-x-auto m-10">
        <table className="table border-2">
          {/* head */}
          <thead>
            <tr className="border-1">
              <th>Photo</th>
              <th>Full Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Date of birth</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <User
                key={user._id}
                user={user}
                users={users}
                setUsers={setUsers}
              ></User>
            ))}
          </tbody>
        </table>
        <div className="flex justify-between mt-8 items-center">
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

export default Home;
