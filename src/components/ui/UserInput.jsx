import { HStack, IconButton, Input } from "@chakra-ui/react";

function UserInput({ placeholder, icon }) {
  console.log(icon);
  return (
    <HStack py="10" spacing="3">
      <Input
        variant="outline"
        placeholder={placeholder}
        size="md"
        bg="white"
        px="5"
        textAlign="center"
      />
      <IconButton variant="solid" colorScheme="gray" icon={icon} />
    </HStack>
  );
}

export default UserInput;
