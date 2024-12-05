import { Button } from "@/components/ui/button";
import {
  DialogActionTrigger,
  DialogBody,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { type ReactNode, useState } from "react";
import { useDeleteShortUrl } from "./delete-short-url-query";

export const DeleteUrlDialog = ({
  id,
  children,
}: { id: string; children: ReactNode }) => {
  const [open, setOpen] = useState(false);
  const { mutate: submit, isPending } = useDeleteShortUrl(id, () =>
    setOpen(false),
  );
  const handleDeleteShortUrl = () => {
    if (isPending) return;
    submit();
  };

  return (
    <DialogRoot lazyMount open={open} onOpenChange={(e) => setOpen(e.open)}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Short Url</DialogTitle>
        </DialogHeader>
        <DialogBody>Confirm delete? This action cannot be undone.</DialogBody>
        <DialogFooter>
          <DialogActionTrigger asChild>
            <Button variant="outline">Cancel</Button>
          </DialogActionTrigger>
          <Button
            bg="fg.error"
            loading={isPending}
            onClick={handleDeleteShortUrl}
          >
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </DialogRoot>
  );
};
