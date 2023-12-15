import he from "he";
import PropTypes from "prop-types";
import {
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
import { useGetGameByIdQuery } from "src/utils/gamesApi";
import useFindDescription from "src/hooks/useFindDescription";
import useFindImage from "src/hooks/useFindImage";

function UsersGameModal({ selectedGameId, isOpen, onClose }) {
  const { data, isError, error, isLoading, isSuccess } =
    useGetGameByIdQuery(selectedGameId);

  const description = useFindDescription(data);
  const image = useFindImage(data);

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        {isLoading && <Skeleton height="20px" />}

        {isError && <Text>{error.error}</Text>}
        <ModalOverlay />
        {isSuccess && (
          <ModalContent>
            <ModalHeader align="center">
              <Skeleton isLoaded={!isLoading}>
                {data && (
                  <Heading as="h4" size={{ base: "sm", sm: "md" }} mt="5">
                    {he.decode(data[0].children[2].attributes.value)}
                  </Heading>
                )}
              </Skeleton>
            </ModalHeader>

            <ModalCloseButton />
            <ModalBody>
              <Skeleton isLoaded={!isLoading}>
                <Image src={image} borderRadius={5} />
              </Skeleton>

              <Skeleton isLoaded={!isLoading}>
                <GameInfoTable selectedGameId={selectedGameId} />
              </Skeleton>

              <Skeleton isLoaded={!isLoading}>
                <Text textAlign="justify" pt="5">
                  {description}
                </Text>
              </Skeleton>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="gray" mr={3} onClick={onClose}>
                Close
              </Button>
              <Button variant="ghost">Go to stats</Button>
            </ModalFooter>
          </ModalContent>
        )}
      </Modal>
    </>
  );
}

UsersGameModal.propTypes = {
  selectedGameId: PropTypes.string,
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
};

export default UsersGameModal;
