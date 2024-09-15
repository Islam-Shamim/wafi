import PropTypes from 'prop-types';
const Employee = ({user}) => {
    console.log(user)
    const {first_name,last_name,email,phone_number,photo,date_of_birth} = user
    return (
        <tr className="border-1">
            <td>
              <div className="avatar">
                <div className="mask mask-squircle h-12 w-12">
                  <img
                    src={photo}
                    alt="Avatar Tailwind CSS Component"
                  />
                </div>
              </div>
            </td>
            <td>
              <h2 className="font-bold">{first_name} {last_name}</h2>
            </td>
            <td>{email}</td>
            <td>{phone_number}</td>
            <td>{date_of_birth}</td>
          </tr>
    );
};

Employee.propTypes = {
  user: PropTypes.object
};

export default Employee;