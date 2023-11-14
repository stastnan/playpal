import { useRef } from "react";
import {
  Box,
  Button,
  Heading,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Skeleton,
  Text,
} from "@chakra-ui/react";
import GameInfoTable from "src/components/ui/GameInfoTable";

function UsersGameModal({ isOpen, onClose, selectedGameInfo, isLoading }) {
  const finalRef = useRef(null);

  return (
    <>
      <Box ref={finalRef} tabIndex={-1} aria-label="Focus moved to this box">
        Some other content that ll receive focus on close.
      </Box>

      <Modal finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader align="center">
            <Skeleton isLoaded={!isLoading}>
              <Heading as="h4" size={{ base: "sm", sm: "md" }}>
                {selectedGameInfo?.name["@_value"]}
              </Heading>
            </Skeleton>
          </ModalHeader>

          <ModalCloseButton />
          <ModalBody>
            <Skeleton isLoaded={!isLoading}>
              <Image src={selectedGameInfo?.image} borderRadius={5} />
            </Skeleton>
            <Skeleton isLoaded={!isLoading}>
              <GameInfoTable selectedGameInfo={selectedGameInfo} />
            </Skeleton>
            <Skeleton isLoaded={!isLoading}>
              <Text textAlign="justify" pt="5">
                {selectedGameInfo?.description}
              </Text>
            </Skeleton>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost">Secondary Action</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default UsersGameModal;
