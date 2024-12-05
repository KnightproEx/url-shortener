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
import { Controller, type SubmitHandler, useForm } from "react-hook-form";
import {
  type UpdateShortUrlInput,
  updateShortUrlSchema,
  useUpdateShortUrl,
} from "./update-short-url-query";

export const ViewUrlDialog = ({
  id,
  data,
  children,
}: { data: UpdateShortUrlInput; id: string; children: ReactNode }) => {
  const [open, setOpen] = useState(false);
  const { mutate: submit, isPending } = useUpdateShortUrl(id, () =>
    setOpen(false),
  );
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateShortUrlInput>({
    resolver: zodResolver(updateShortUrlSchema),
    defaultValues: data,
  });
  const handleUpdateShortUrl: SubmitHandler<UpdateShortUrlInput> = (data) => {
    if (isPending) return;
    submit(data);
  };

  return (
    <DialogRoot lazyMount open={open} onOpenChange={(e) => setOpen(e.open)}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <form onSubmit={(e) => void handleSubmit(handleUpdateShortUrl)(e)}>
          <DialogHeader>
            <DialogTitle>View Short Url</DialogTitle>
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
              <Controller
                name="isPublic"
                control={control}
                render={({ field }) => (
                  <Field
                    invalid={!!errors.isPublic}
                    errorText={errors.isPublic?.message}
                  >
                    <Switch
                      name={field.name}
                      checked={field.value}
                      onCheckedChange={({ checked }) => field.onChange(checked)}
                      inputProps={{ onBlur: field.onBlur }}
                    >
                      Public
                    </Switch>
                  </Field>
                )}
              />
              <Controller
                name="isActive"
                control={control}
                render={({ field }) => (
                  <Field
                    invalid={!!errors.isActive}
                    errorText={errors.isActive?.message}
                  >
                    <Switch
                      name={field.name}
                      checked={field.value}
                      onCheckedChange={({ checked }) => field.onChange(checked)}
                      inputProps={{ onBlur: field.onBlur }}
                    >
                      Active
                    </Switch>
                  </Field>
                )}
              />
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
