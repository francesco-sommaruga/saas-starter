import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getSession, getSubscription } from "@/supabase-server";
import moment from "moment";
import ManageSubscriptionButton from "./ManageSubscriptionButton";
import Link from "next/link";

import SubscriptionStatusBadge from "./SubscriptionStatusBadge";
import { Database } from "@/types/supabase";

type Subscription = Database["public"]["Tables"]["subscriptions"]["Row"];
type Product = Database["public"]["Tables"]["products"]["Row"];
type Price = Database["public"]["Tables"]["prices"]["Row"];
interface ProductWithPrices extends Product {
  prices: Price[];
}
interface PriceWithProduct extends Price {
  products: Product | null;
}
interface SubscriptionWithProduct extends Subscription {
  prices: PriceWithProduct | null;
}

const AccountPage = async () => {
  const subscription = await getSubscription();
  const session = await getSession();
  const subscriptionPrice =
    subscription &&
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: subscription?.prices?.currency!,
      minimumFractionDigits: 0,
    }).format((subscription?.prices?.unit_amount || 0) / 100);

  const text = getText(subscription);

  return (
    <div>
      <Card className="overflow-hidden">
        <CardHeader>
          <div className="flex justify-between">
            <CardTitle>{text.title}</CardTitle>
            {subscription?.status && (
              <SubscriptionStatusBadge
                cancelAt={subscription.cancel_at}
                status={subscription.status}
              />
            )}
          </div>
          <CardDescription>{text.description}</CardDescription>
        </CardHeader>
        <CardContent>
          {subscription && (
            <h3 className="font-bold text-xl">{`${subscriptionPrice}/${subscription?.prices?.interval}`}</h3>
          )}
          {text.cardContent}
        </CardContent>
        <CardFooter className="flex justify-between bg-background pt-6 border-t">
          <p className="text-foreground/70">
            Manage your subscription on Stripe.
          </p>
          {subscription ? (
            <ManageSubscriptionButton
              buttonText={text.buttonText}
              session={session}
            />
          ) : (
            <Link href="/subscribe">
              <Button variant="secondary">{text.buttonText}</Button>
            </Link>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

const getText = (subscription: SubscriptionWithProduct | null) => {
  const returnText = {
    title: "",
    description: "",
    cardContent: "",
    buttonText: "",
  };
  if (subscription) {
    returnText.title = "Subscription";
    returnText.description = `You are currently on the ${subscription?.prices?.products?.name} plan.`;
    if (subscription?.cancel_at_period_end) {
      returnText.buttonText = "Resume Subscription";
    } else if (subscription?.status === "past_due") {
      returnText.buttonText = "Update Payment Method";
    } else {
      returnText.buttonText = "Manage";
    }

    if (subscription.cancel_at_period_end) {
      returnText.cardContent = `You have canceled your subscription. It will expire on ${moment(
        subscription?.cancel_at
      ).format("DD-MM-YYYY")}. You can resume your subscription until then.`;
    } else {
      returnText.cardContent = `Next Invoice: ${moment(
        subscription?.current_period_end
      ).format("DD-MM-YYYY")}`;
    }
  } else {
    returnText.title = "You are not Subscribed";
    returnText.description = "Subscribe to unlock all features.";
    returnText.buttonText = "Choose Plan";
    returnText.cardContent =
      "You are not subscribed to any plan. Subscribe to create your chatbots.";
  }

  return returnText;
};

export default AccountPage;
