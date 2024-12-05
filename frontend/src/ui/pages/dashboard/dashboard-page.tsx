import { Button } from "@/components/ui/button";
import { getUrlFromSlugEndpoint } from "@/config/api-endpoint";
import type { PublicUrl, UserUrl } from "@/data/repositories/short-url";
import { DataTable } from "@/ui/components/data-table";
import Topbar from "@/ui/components/top-bar";
import { useFetchUserShortUrls } from "@/ui/queries/fetch-user-short-urls";
import { Flex, HStack, IconButton, Stack, Text } from "@chakra-ui/react";
import { createColumnHelper } from "@tanstack/react-table";
import { FiArrowRight, FiEye, FiTrash } from "react-icons/fi";
import { useFetchPublicShortUrls } from "../../queries/fetch-public-short-urls";
import { DeleteUrlDialog } from "./delete-url-dialog";
import { NewUrlDialog } from "./new-url-dialog";
import { ViewUrlDialog } from "./view-url-dialog";

const DashboardPage = () => {
  const { isSuccess: publicShortUrlsIsSuccess, data: publicShortUrlsData } =
    useFetchPublicShortUrls();
  const { isSuccess: userShortUrlsIsSuccess, data: userShortUrlsData } =
    useFetchUserShortUrls();
  const publicShortUrlsColumnHelper = createColumnHelper<PublicUrl>();
  const userShortUrlsColumnHelper = createColumnHelper<UserUrl>();

  const publicShortUrlsColumns = [
    publicShortUrlsColumnHelper.display({
      header: "#",
      id: "index",
      cell: ({ row }) => row.index + 1,
      size: 20,
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
      header: "#",
      id: "index",
      cell: ({ row }) => row.index + 1,
      size: 20,
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
      cell: (info) => (
        <Stack align="center">{info.getValue() ? "Yes" : "No"}</Stack>
      ),
      header: "Active",
      size: 20,
    }),
    userShortUrlsColumnHelper.accessor("timesClicked", {
      cell: (info) => <Stack align="center">{info.getValue()}</Stack>,
      header: "Times Clicked",
      size: 20,
    }),
    userShortUrlsColumnHelper.accessor(
      (row) => {
        return { isActive: row.isActive, slug: row.slug };
      },
      {
        cell: (info) =>
          info.getValue().isActive && (
            <IconButton
              variant="ghost"
              onClick={
                info.getValue().isActive
                  ? () => {
                      const win = window.open(
                        getUrlFromSlugEndpoint(info.getValue().slug),
                        "_blank",
                      );
                      win?.focus();
                    }
                  : undefined
              }
            >
              <FiArrowRight />
            </IconButton>
          ),
        header: "Open",
        id: "open",
        enableSorting: false,
        size: 20,
      },
    ),
    userShortUrlsColumnHelper.accessor((row) => row, {
      cell: (info) => (
        <ViewUrlDialog id={info.getValue().id} data={info.getValue()}>
          <IconButton variant="ghost">
            <FiEye />
          </IconButton>
        </ViewUrlDialog>
      ),
      header: "View",
      id: "view",
      enableSorting: false,
      size: 20,
    }),
    userShortUrlsColumnHelper.accessor("id", {
      cell: (info) => (
        <DeleteUrlDialog id={info.getValue()}>
          <IconButton variant="ghost">
            <FiTrash />
          </IconButton>
        </DeleteUrlDialog>
      ),
      header: "Delete",
      id: "delete",
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
              <HStack justifyContent="space-between">
                <Text fontSize="lg" fontWeight="medium">
                  My Urls
                </Text>
                <NewUrlDialog>
                  <Button>New Url</Button>
                </NewUrlDialog>
              </HStack>
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
