import { getUrlFromSlugEndpoint } from "@/config/api-endpoint";
import type { PublicUrl, UserUrl } from "@/data/repositories/short-url";
import { DataTable } from "@/ui/components/data-table";
import Topbar from "@/ui/components/top-bar";
import { useFetchUserShortUrls } from "@/ui/queries/fetch-user-short-urls";
import { Flex, IconButton, Stack, Text } from "@chakra-ui/react";
import { createColumnHelper } from "@tanstack/react-table";
import { FiArrowRight, FiEye } from "react-icons/fi";
import { useFetchPublicShortUrls } from "../../queries/fetch-public-short-urls";

const DashboardPage = () => {
  const { isSuccess: publicShortUrlsIsSuccess, data: publicShortUrlsData } =
    useFetchPublicShortUrls();
  const { isSuccess: userShortUrlsIsSuccess, data: userShortUrlsData } =
    useFetchUserShortUrls();
  const publicShortUrlsColumnHelper = createColumnHelper<PublicUrl>();
  const userShortUrlsColumnHelper = createColumnHelper<UserUrl>();

  const publicShortUrlsColumns = [
    publicShortUrlsColumnHelper.display({
      header: "No",
      id: "index",
      cell: ({ row }) => row.index + 1,
    }),
    publicShortUrlsColumnHelper.accessor("name", {
      cell: (info) => info.getValue(),
      header: "Name",
    }),
    publicShortUrlsColumnHelper.accessor("slug", {
      cell: (info) => info.getValue(),
      header: "Slug",
    }),
    publicShortUrlsColumnHelper.accessor("url", {
      cell: (info) => info.getValue(),
      header: "Url",
    }),
    publicShortUrlsColumnHelper.accessor("slug", {
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

  const userShortUrlsColumns = [
    userShortUrlsColumnHelper.display({
      header: "No",
      id: "index",
      cell: ({ row }) => row.index + 1,
    }),
    userShortUrlsColumnHelper.accessor("name", {
      cell: (info) => info.getValue(),
      header: "Name",
    }),
    userShortUrlsColumnHelper.accessor("slug", {
      cell: (info) => info.getValue(),
      header: "Slug",
    }),
    userShortUrlsColumnHelper.accessor("url", {
      cell: (info) => info.getValue(),
      header: "Url",
    }),
    userShortUrlsColumnHelper.accessor("isActive", {
      cell: (info) => (info.getValue() ? "Yes" : "No"),
      header: "Active",
    }),
    userShortUrlsColumnHelper.accessor("timesClicked", {
      cell: (info) => info.getValue(),
      header: "Times Clicked",
    }),
    userShortUrlsColumnHelper.accessor("slug", {
      cell: (info) => (
        <IconButton
          variant="ghost"
          onClick={() => {
            const slug = info.getValue();
            const win = window.open(getUrlFromSlugEndpoint(slug), "_blank");
            win?.focus();
          }}
        >
          <FiEye />
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
      <Topbar />
      <Flex direction="column">
        <Stack gap="2">
          {publicShortUrlsIsSuccess && (
            <Stack p="4" gap="2">
              <Text fontSize="lg" fontWeight="medium">
                Public Urls
              </Text>
              <DataTable
                columns={publicShortUrlsColumns}
                data={publicShortUrlsData}
              />
            </Stack>
          )}
          {userShortUrlsIsSuccess && (
            <Stack p="4" gap="2">
              <Text fontSize="lg" fontWeight="medium">
                My Urls
              </Text>
              <DataTable
                columns={userShortUrlsColumns}
                data={userShortUrlsData}
              />
            </Stack>
          )}
        </Stack>
      </Flex>

      {/* <CreateOrderModal isOpen={open} onClose={onClose} /> */}
    </>
  );
};

export default DashboardPage;
