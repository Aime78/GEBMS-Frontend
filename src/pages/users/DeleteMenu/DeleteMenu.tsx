import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../../../components/ui/alert-dialog";
import { useToast } from "../../../hooks/use-toast";
import { Loader2, XCircle } from "lucide-react";
import Api, { AuthOptions } from "../../../routes/AppEndpoints";
import axios from "axios";

interface DeleteMenuProps {
  open: boolean;
  id: string;
  // eslint-disable-next-line no-unused-vars
  setOpen: (open: boolean) => void;
}

const DeleteMenu = ({ open, setOpen, id }: DeleteMenuProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const deleteUser = async () => {
    setIsSubmitting(true);
    try {
      const response = await axios.delete(
        `${Api.BASE_URL}/${Api.USERS}/${id}`,
        AuthOptions
      );
      console.log(response);
      toast({
        title: "User deleted successfully!",
        description: "The user will need to be invited again.",
      });
      setIsSubmitting(false);
      setOpen(false);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("Error:", error);
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      });
      setIsSubmitting(false);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center justify-between">
            <span>Are you absolutely sure?</span>{" "}
            <XCircle
              onClick={() => setOpen(false)}
              className="cursor-pointer text-muted-foreground"
            />
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the
            employee account and remove the data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={deleteUser}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
                <span>Loading</span>{" "}
              </>
            ) : (
              "Continue"
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteMenu;
