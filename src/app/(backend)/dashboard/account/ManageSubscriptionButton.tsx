"use client";

import { Button } from "@/components/ui/button";
import { postData } from "@/utils/helpers";

import { Session } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";

import { useToast } from "@/components/ui/use-toast";

interface Props {
  session: Session | null;
  buttonText: string;
}

export default function ManageSubscriptionButton({
  session,
  buttonText,
}: Props) {
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
    <Button
      variant="outline"
      disabled={!session}
      onClick={redirectToCustomerPortal}
    >
      {buttonText}
    </Button>
  );
}
