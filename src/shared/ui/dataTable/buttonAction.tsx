import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  AlertDialog,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogTitle,
  AlertDialogDescription
} from "@/shared";
import { Button } from "../custom";
import { MoreHorizontal } from "lucide-react";

interface Props {
  items: Array<{ key: "Delete" | "Edit" | string; onClick: () => void }>;
}

const ButtonAction = ({ items }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<null | {
    key: string;
    onClick: () => void;
  }>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleDeleteClick = (item: { key: string; onClick: () => void }) => {
    setSelectedItem(item);
    setIsOpen(true);
    setDropdownOpen(false); // Close the dropdown menu
  };

  const confirmDelete = () => {
    if (selectedItem) {
      selectedItem.onClick();
    }
    setIsOpen(false);
    setSelectedItem(null);
  };

  const closeDialog = () => {
    setIsOpen(false);
    setSelectedItem(null);
  };

  return (
    <>
      <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="w-8 h-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {items.map((item, index) => (
            <DropdownMenuItem
              key={index}
              className="cursor-pointer"
              onClick={() =>
                item.key === "Delete" ? handleDeleteClick(item) : item.onClick()
              }
            >
              {item.key}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialog open={isOpen} onOpenChange={closeDialog}>
        <AlertDialogOverlay className="bg-black/0">
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Confirmation</AlertDialogTitle>
            </AlertDialogHeader>
            <AlertDialogDescription>
              Are you sure you want to delete this item?
            </AlertDialogDescription>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={closeDialog}>
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction onClick={confirmDelete}>
                Confirm
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default ButtonAction;
