import { Input } from "@chakra-ui/react";

function UserInput({ placeholder, setUserName }) {
  let userName = null;
  return (
    <Input
      variant="outline"
      placeholder={placeholder}
      size="md"
      bg="white"
      px="5"
      onChange={(e) => {
        setUserName(e.target.value);
     
      }}
    />
  );
}

export default UserInput;
