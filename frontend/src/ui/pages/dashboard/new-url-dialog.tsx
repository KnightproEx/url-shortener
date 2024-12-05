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
import { Field } from "@/components/ui/field";
import { Switch } from "@/components/ui/switch";
import { Input, Stack } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { type ReactNode, useState } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import {
  type CreateShortUrlInput,
  createShortUrlSchema,
  useCreateShortUrl,
} from "./create-short-url-query";

export const NewUrlDialog = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(false);
  const { mutate: submit, isPending } = useCreateShortUrl(() => setOpen(false));
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateShortUrlInput>({
    resolver: zodResolver(createShortUrlSchema),
  });
  const handleCreateShortUrl: SubmitHandler<CreateShortUrlInput> = (data) => {
    if (isPending) return;
    submit(data);
  };

  return (
    <DialogRoot lazyMount open={open} onOpenChange={(e) => setOpen(e.open)}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <form onSubmit={(e) => void handleSubmit(handleCreateShortUrl)(e)}>
          <DialogHeader>
            <DialogTitle>New Short Url</DialogTitle>
          </DialogHeader>
          <DialogBody pb="4">
            <Stack gap="4">
              <Field
                label="Name"
                invalid={!!errors.name}
                errorText={errors.name?.message}
              >
                <Input {...register("name")} />
              </Field>
              <Field
                label="Slug"
                invalid={!!errors.slug}
                errorText={errors.slug?.message}
              >
                <Input {...register("slug")} />
              </Field>
              <Field
                label="Url"
                invalid={!!errors.url}
                errorText={errors.url?.message}
              >
                <Input {...register("url")} />
              </Field>
              <Field
                invalid={!!errors.isPublic}
                errorText={errors.isPublic?.message}
              >
                <Switch {...register("isPublic")}>Public</Switch>
              </Field>
            </Stack>
          </DialogBody>
          <DialogFooter>
            <DialogActionTrigger asChild>
              <Button variant="outline">Cancel</Button>
            </DialogActionTrigger>
            <Button loading={isPending} type="submit">
              Save
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </DialogRoot>
  );
};
