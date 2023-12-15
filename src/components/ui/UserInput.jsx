import { Input } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { setUsername } from "src/utils/userSlice";
function UserInput({ placeholder }) {
  // let userName = null;
  const dispatch = useDispatch();
  const handleInputChange = (event) => {
    dispatch(setUsername(event.target.value));
  };
  return (
    <Input
      variant="outline"
      placeholder={placeholder}
      size="md"
      bg="white"
      px="5"
      onChange={handleInputChange}
    />
  );
}

UserInput.propTypes = {
  placeholder: PropTypes.string,
};

export default UserInput;
