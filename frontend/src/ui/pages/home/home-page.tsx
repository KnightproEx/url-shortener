import { ProgressBar, ProgressRoot } from "@/components/ui/progress";
import type { Url } from "@/data/repositories/short-url";
import { DataTable } from "@/ui/components/data-table";
import { Container, Flex, IconButton } from "@chakra-ui/react";
import { createColumnHelper } from "@tanstack/react-table";
import { FiArrowRight } from "react-icons/fi";
import { useFetchPublicShortUrl } from "./fetch-public-short-url-query";

const HomePage = () => {
  const { isPending, isSuccess, data } = useFetchPublicShortUrl();
  const columnHelper = createColumnHelper<Url>();

  const columns = [
    columnHelper.display({
      header: "No",
      id: "index",
      cell: ({ row }) => row.index + 1,
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
          onClick={() => {
            // TODO: Open url from api
            const win = window.open(info.getValue(), "_blank");
            win?.focus();
          }}
        >
          <FiArrowRight />
        </IconButton>
      ),
      header: "Open",
      id: "open",
      enableSorting: false,
      size: 20,
    }),
  ];

  return (
    <>
      <Flex direction="column">
        {isPending && (
          <ProgressRoot value={null}>
            <ProgressBar />
          </ProgressRoot>
        )}
        {isSuccess && (
          <Container pt="4">
            <DataTable columns={columns} data={data} />
          </Container>
        )}
      </Flex>
    </>
  );
};

export default HomePage;
