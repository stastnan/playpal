import { Input } from "@chakra-ui/react";

function UserInput({ placeholder, setUser, user }) {
  // let userName = null;
  return (
    <Input
      variant="outline"
      placeholder={placeholder}
      size="md"
      bg="white"
      px="5"
      value={user}
      onChange={(e) => {
        setUser(e.target.value);
      }}
    />
  );
}

export default UserInput;
