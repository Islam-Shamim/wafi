import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import PropTypes from "prop-types";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const User = ({ user, users, setUsers }) => {
  const {
    _id,
    first_name,
    last_name,
    email,
    phone_number,
    photo,
    date_of_birth,
  } = user;

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonText: "No",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:5000/users/${id}`, {
          method: "Delete",
        })
          .then((res) => res.json())
          .then((data) => {
            //console.log(data)
            if (data.deletedCount > 0) {
              Swal.fire({
                title: "Deleted!",
                text: "Successfully deleted.",
                icon: "success",
              });
              const remaining = users.filter((user) => user._id !== id);
              setUsers(remaining);
            }
          });
      }
    });
  };
  return (
    <tr className="border-1">
      <td>
        <div className="avatar">
          <div className="mask mask-squircle h-12 w-12">
            <img src={photo} alt="Avatar Tailwind CSS Component" />
          </div>
        </div>
      </td>
      <td>
        <h2 className="font-bold">
          {first_name} {last_name}
        </h2>
      </td>
      <td>{email}</td>
      <td>{phone_number}</td>
      <td>{date_of_birth}</td>
      <td>
        <div className="flex items-center">
          <Link to={`updateEmployee/${_id}`}>
            <button className="mr-4">
              <FaEdit className="text-2xl" />
            </button>
          </Link>
          <button onClick={() => handleDelete(_id)}>
            <MdDelete className="text-2xl" />
          </button>
        </div>
      </td>
    </tr>
  );
};
User.propTypes = {
  user: PropTypes.object,
  users: PropTypes.array,
  setUsers: PropTypes.func,
};
export default User;
