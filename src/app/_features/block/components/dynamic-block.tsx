import { Card, CardTitle, CardContent } from "@/app/_components/ui/card";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/app/_components/ui/context-menu";
import { api, RouterOutputs } from "@/trpc/react";
import { Block } from "@prisma/client";
import { Settings, LockKeyholeIcon } from "lucide-react";
import React, { Suspense } from "react";
import { toast } from "sonner";
import ClipLoader from "react-spinners/ClipLoader";
import BlockContent from "./block-content";
import BlockSettings from "./block-settings";
type View = RouterOutputs["block"]["getByView"];
type Props = {
  block: Block;
};
const DynamicBlock = ({ block }: Props) => {
  const utils = api.useUtils();
  const { mutate } = api.block.delete.useMutation({
    onSuccess: () => {
      toast.success("Block deleted successfully!");
      return utils.view.getViewById.invalidate({
        id: block.viewId,
      });
    },
    onError: (error) => {
      toast.error(`Error deleting block: ${error}`);
      console.error("Error deleting block:", error);
    },
  });

  function handleDeleteBlock() {
    mutate({ id: block.id });
  }
  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <Card className="h-full w-full shadow-lg transition-shadow duration-300 hover:shadow-xl">
          <div className="flex w-full items-center justify-between border-b p-3">
            <CardTitle>{block?.name}</CardTitle>
            <div className="inline-flex gap-2 *:cursor-pointer">
              <BlockSettings block={block} />

              <LockKeyholeIcon size={18} />
            </div>
          </div>
          <CardContent className="h-full p-0">
            <Suspense
              fallback={
                <ClipLoader
                  size={150}
                  aria-label="Loading Spinner"
                  data-testid="loader"
                />
              }
            >
              <BlockContent block={block} />
            </Suspense>
          </CardContent>
        </Card>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem onClick={handleDeleteBlock}>
          <span className="text-red-500">Delete</span>
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
};

export default DynamicBlock;
