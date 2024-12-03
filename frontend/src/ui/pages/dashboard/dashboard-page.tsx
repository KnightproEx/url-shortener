import { ProgressBar, ProgressRoot } from "@/components/ui/progress";
import type { Url } from "@/data/repositories/short-url";
import { DataTable } from "@/ui/components/data-table";
import { Container, Flex, IconButton } from "@chakra-ui/react";
import { createColumnHelper } from "@tanstack/react-table";
import { FiArrowRight } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useFetchPublicShortUrl } from "./fetch-public-short-url-query";

const DashboardPage = () => {
  // const { open, onOpen, onClose } = useDisclosure();
  const { isPending, isSuccess, data } = useFetchPublicShortUrl();
  const columnHelper = createColumnHelper<Url>();
  const navigate = useNavigate();

  const columns = [
    columnHelper.display({
      header: "No",
      cell: ({ row }) => row.index,
    }),
    columnHelper.accessor("name", {
      cell: (info) => info.getValue(),
      header: "Name",
    }),
    columnHelper.accessor("slug", {
      cell: (info) => info.getValue(),
      header: "Slug",
    }),
    columnHelper.accessor("url", {
      cell: (info) => info.getValue(),
      header: "Url",
    }),
    columnHelper.accessor("url", {
      cell: (info) => (
        <IconButton
          variant="ghost"
          aria-label="view"
          onClick={() => {
            navigate(info.getValue());
          }}
        >
          <FiArrowRight />
        </IconButton>
      ),
      header: "View",
      id: "view",
      enableSorting: false,
      size: 20,
    }),
  ];

  return (
    <>
      <Flex direction="column">
        {isPending && (
          // <Progress mt={-4} mb={2} mx={-4} height={1} isIndeterminate />
          <ProgressRoot>
            <ProgressBar />
          </ProgressRoot>
        )}
        {isSuccess && (
          <Container pt="4">
            <DataTable columns={columns} data={data} />
          </Container>
        )}
      </Flex>

      {/* <CreateOrderModal isOpen={open} onClose={onClose} /> */}
    </>
  );
};

export default DashboardPage;
