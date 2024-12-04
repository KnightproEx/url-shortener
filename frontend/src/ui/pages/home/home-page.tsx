import { getUrlFromSlugEndpoint } from "@/config/api-endpoint";
import type { PublicUrl } from "@/data/repositories/short-url";
import { DataTable } from "@/ui/components/data-table";
import Topbar from "@/ui/components/top-bar";
import { Flex, IconButton, Stack } from "@chakra-ui/react";
import { createColumnHelper } from "@tanstack/react-table";
import { FiArrowRight } from "react-icons/fi";
import { useFetchPublicShortUrls } from "../../queries/fetch-public-short-urls";

const HomePage = () => {
  const { isSuccess, data } = useFetchPublicShortUrls();
  const columnHelper = createColumnHelper<PublicUrl>();

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
    columnHelper.accessor("slug", {
      cell: (info) => (
        <IconButton
          variant="ghost"
          onClick={() => {
            const slug = info.getValue();
            const win = window.open(getUrlFromSlugEndpoint(slug), "_blank");
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
      <Topbar />
      <Flex direction="column">
        {isSuccess && (
          <Stack p="4" gap="2">
            <DataTable columns={columns} data={data} />
          </Stack>
        )}
      </Flex>
    </>
  );
};

export default HomePage;
