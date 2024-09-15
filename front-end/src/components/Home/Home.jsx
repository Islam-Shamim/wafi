import { useEffect, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import User from "./User";
import { useLoaderData } from "react-router-dom";
import { LuArrowUpDown} from "react-icons/lu";

const Home = () => {
  const [users, setUsers] = useState([]);
  //const [order, setOrder] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const { count } = useLoaderData();
  const itemsPerPage = 10;
  const numberOfPages = Math.ceil(count / itemsPerPage);

  // const sorting = (col) => {
  //   if (order === "ASC") {
  //     const sorted = [...users].sort((a, b) => {
  //       a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1;
  //     });
  //     setUsers(sorted);
  //     setOrder("DSC");
  //   }
  //   if (order === "DSC") {
  //     const sorted = [...users].sort((a, b) => {
  //       a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1;
  //     });
  //     setUsers(sorted);
  //     setOrder("ASC");
  //   }
  // };

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
              <th>
                <div className="flex items-center">
                  <p className="mr-2">Photo</p>
                  <span >
                  <LuArrowUpDown />
                  </span>
                </div>
              </th>
              <th>
                <div className="flex items-center">
                  <p className="mr-2">Full Name</p>
                  <span >
                  <LuArrowUpDown />
                  </span>
                </div>
              </th>
              <th>
                <div className="flex items-center">
                  <p className="mr-2">Email</p>
                  <span >
                  <LuArrowUpDown />
                  </span>
                </div>
              </th>
              <th>
                <div className="flex items-center">
                  <p className="mr-2">Phone_number</p>
                  <span >
                  <LuArrowUpDown />
                  </span>
                </div>
              </th>
              <th>
                <div className="flex items-center">
                  <p className="mr-2">date_of_birth</p>
                  <span >
                  <LuArrowUpDown />
                  </span>
                </div>
              </th>
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
            {currentPage + 1 != numberOfPages ? (
              <p>
                Showing {currentPage * 10} to {(currentPage + 1) * 10} out of{" "}
                {count}
              </p>
            ) : (
              <p>
                Showing {currentPage * 10} to {count} out of {count}
              </p>
            )}
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
                {page + 1}
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
