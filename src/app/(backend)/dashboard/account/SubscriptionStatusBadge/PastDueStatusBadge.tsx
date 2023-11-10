"use client";

import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { postData } from "@/utils/helpers";

const SubscriptionStatusBadge = ({
  status,
}: {
  status:
    | "active"
    | "trialing"
    | "canceled"
    | "incomplete"
    | "incomplete_expired"
    | "past_due"
    | "unpaid"
    | "paused";
}) => {
  const formatStatus = (status: string) => {
    switch (status) {
      case "active":
        return "Active";
      case "incomplete":
        return "Incomplete";
      case "incomplete_expired":
        return "Incomplete Expired";
      case "past_due":
        return "Past Due";
      case "canceled":
        return "Canceled";
      case "unpaid":
        return "Unpaid";
      default:
        return status;
    }
  };

  const [isOpen, setIsOpen] = useState(status === "past_due");
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const router = useRouter();
  const { toast } = useToast();
  const redirectToCustomerPortal = async () => {
    try {
      const { url } = await postData({
        url: "/api/create-portal-link",
      });
      router.push(url);
    } catch (error) {
      if (error)
        return toast({
          title: "Error",
          description: (error as Error).message || "Something went wrong",
          variant: "destructive",
        });
    }
  };

  return (
    <div>
      <AlertDialog open={isClient && isOpen}>
        <AlertDialogTrigger
          onClick={status === "past_due" ? () => setIsOpen(true) : undefined}
        >
          <Badge variant={status === "past_due" ? "destructive" : "secondary"}>
            {formatStatus(status)}
          </Badge>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Your subscription is Past Due</AlertDialogTitle>
            <AlertDialogDescription>
              Update your payment information to avoid interruptions to your
              service.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setIsOpen(false)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                redirectToCustomerPortal();
              }}
            >
              Update Payment Method
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default SubscriptionStatusBadge;
