import { Button } from "@/components/ui/button";
import { useVerifyAuth } from "@/ui/queries/auth/verify-auth";
import { Flex, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useLogout } from "../queries/auth/logout";

// interface Props extends FlexProps {
//   firstname: string;
//   onOpen: () => void;
// }

const Topbar = (/* { onOpen, firstname, ...rest }: Props */) => {
  const { data, isPending } = useVerifyAuth();
  const navigate = useNavigate();
  const { mutate: logout, isPending: isLogoutPending } = useLogout();

  return (
    <Flex
      px="4"
      height="20"
      align="center"
      bg="navy"
      justifyContent="space-between"
    >
      <Text display="flex" fontSize="xl" fontWeight="bold" color="white">
        Url Shortener
      </Text>
      {!isPending &&
        (data ? (
          <Button onClick={() => !isLogoutPending && logout()}>Logout</Button>
        ) : (
          <Button onClick={() => navigate("/login")}>Sign In</Button>
        ))}
    </Flex>
  );
};

export default Topbar;
