import { useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";

const UpdateEmployee = () => {

    const employee = useLoaderData();
    const { _id,first_name,
        last_name,
        email,
        phone_number,
        photo,
        date_of_birth } = employee;

  const handleUpdate = (event) => {
    event.preventDefault();
    const form = event.target;
    const first_name = form.first.value;
    const last_name = form.last.value;
    const email = form.email.value;
    const phone_number = form.phone.value;
    const date_of_birth = form.date.value;
    const photo = form.photo.value;
    const user = { first_name, last_name, email, phone_number, date_of_birth, photo };
    console.log(user);
    
    fetch(`http://localhost:5000/users/${_id}`,{
        method:"PUT",
        body:JSON.stringify(user),
        headers:{
            'content-type':'application/json'
        }
    })
    .then(res=>res.json())
    .then(data=>{
        console.log(data)
        if(data.acknowledged){
            Swal.fire({
                title: 'Update!',
                text: 'Coffee Update Successfully',
                icon: 'success',
                confirmButtonText: 'Cool'
                
              })
        }
    })
  };
  return (
    <div className="border-2 w-full">
      <div className="bg-base-50 p-10">
        <h2 className="text-3xl font-bold font-serif italic px-8 text-center">
          Update Employee Details
        </h2>
        <form className="card-body" onSubmit={handleUpdate}>
          {/* First & Last Name */}
          <div className="md:flex">
            <div className="form-control w-1/2 mr-4">
              <label className="label">
                <span className="label-text">First name</span>
              </label>
              <input
                type="text"
                name="first"
                defaultValue={first_name}
                placeholder="First Name"
                className="input input-bordered"
              />
            </div>
            <div className="form-control w-1/2 mr-4">
              <label className="label">
                <span className="label-text">Last name</span>
              </label>
              <input
                type="text"
                name="last"
                defaultValue={last_name}
                placeholder="Last Name"
                className="input input-bordered"
              />
            </div>
          </div>
          {/* email & phone */}
          <div className="md:flex">
            <div className="form-control w-1/2 mr-4">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="text"
                name="email"
                defaultValue={email}
                placeholder="Email"
                className="input input-bordered"
              />
            </div>
            <div className="form-control w-1/2 mr-4">
              <label className="label">
                <span className="label-text">Phone</span>
              </label>
              <input
                type="text"
                name="phone"
                defaultValue={phone_number}
                placeholder="Phone"
                className="input input-bordered"
              />
            </div>
          </div>
          {/* date & photo */}
          <div className="md:flex">
            <div className="form-control w-1/2 mr-4">
              <label className="label">
                <span className="label-text">Date of birth</span>
              </label>
              <input
                type="date"
                name="date"
                defaultValue={date_of_birth}
                placeholder="Date"
                className="input input-bordered"
              />
            </div>
            <div className="form-control w-1/2 mr-4">
              <label className="label">
                <span className="label-text">Photo</span>
              </label>
              <input
                type="text"
                name="photo"
                defaultValue={photo}
                placeholder="Enter photo url"
                className="input input-bordered pt-2"
              />
            </div>
          </div>
          {/* button */}
          <input
            type="submit"
            value="Update"
            className="btn btn-primary mt-4"
          />
        </form>
      </div>
    </div>
  );
};

export default UpdateEmployee;
