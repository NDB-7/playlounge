import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Link from "next/link";

export default function KickedDialog() {
  return (
    <Dialog open={true}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>You have been kicked!</DialogTitle>
          <DialogDescription>
            The room owner has removed you from the room.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button asChild>
            <Link href="/">Return to Home</Link>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
