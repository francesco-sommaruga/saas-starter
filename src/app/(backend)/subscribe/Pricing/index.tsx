"use client";

import { Database } from "@/types/supabase";
import { postData } from "@/utils/helpers";
import { getStripe } from "@/utils/stripe-client";
import { useState } from "react";
import { Session, User } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import SelectInterval from "./SelectInterval";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Tier from "./Tiers";

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

interface Props {
  session: Session | null;
  user: User | null | undefined;
  products: ProductWithPrices[];
  subscription: SubscriptionWithProduct | null;
}

type BillingInterval = "lifetime" | "year" | "month" | "day" | "week";

const Pricing = ({ products, subscription, user, session }: Props) => {
  const router = useRouter();
  const [priceIdLoading, setPriceIdLoading] = useState<string>();
  const [billingInterval, setBillingInterval] =
    useState<BillingInterval>("month");
  const intervals = Array.from(
    new Set(
      products.flatMap((product) =>
        product?.prices?.map((price) => price?.interval)
      )
    )
  );

  const handleCheckout = async (price: Price) => {
    setPriceIdLoading(price.id);
    if (!user) {
      return router.push("/auth/login");
    }
    if (subscription) {
      return router.push("/dashboard/account");
    }
    try {
      const { sessionId } = await postData({
        url: "/api/create-checkout-session",
        data: { price },
      });

      const stripe = await getStripe();
      stripe?.redirectToCheckout({ sessionId });
    } catch (error) {
      return alert((error as Error)?.message);
    } finally {
      setPriceIdLoading(undefined);
    }
  };
  return (
    <div className="mx-auto max-w-7xl px-6 lg:px-8">
      {/* Pricing */}
      <Tabs
        value={billingInterval}
        className="flex flex-col justify-center items-center"
      >
        <TabsList className="max-w-max bg-zinc-900 text-white">
          {intervals.map((interval) =>
            interval === null ? null : (
              <TabsTrigger
                value={interval}
                key={`${interval}_tabs_trigger`}
                onClick={() => setBillingInterval(interval)}
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                {interval}
              </TabsTrigger>
            )
          )}
        </TabsList>
        {intervals.map((interval) =>
          interval === null ? null : (
            <TabsContent
              value={interval}
              key={`${interval}_tabs_content`}
              className="w-full mt-8"
            >
              <div className="mx-auto grid max-w-md grid-cols-1 gap-8 lg:max-w-4xl lg:grid-cols-2">
                {/* <div className="md:border md:rounded-md md:p-12 flex gap-4 flex-col md:flex-row mt-4"> */}
                {products.map((product) => {
                  const price = product?.prices?.find(
                    (price) => price.interval === billingInterval
                  );
                  if (!price) return null;
                  const priceString = new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: price.currency!,
                    minimumFractionDigits: 0,
                  }).format((price?.unit_amount || 0) / 100);
                  return (
                    <Tier
                      key={product.id}
                      product={product}
                      billingInterval={billingInterval}
                      priceString={priceString}
                      highlightedProduct="Premium"
                      checkoutButton={
                        <Button
                          type="button"
                          disabled={!session || priceIdLoading === price.id}
                          onClick={() => handleCheckout(price)}
                          className="block w-full py-2 mt-8 text-sm font-semibold text-center text-white rounded-md"
                        >
                          {subscription ? "Manage" : "Subscribe"}
                        </Button>
                      }
                    />
                  );
                })}
              </div>
            </TabsContent>
          )
        )}
      </Tabs>
      <div className="flex flex-col items-start gap-x-8 gap-y-6 rounded-3xl p-8 ring-1 ring-gray-900/10 sm:gap-y-10 sm:p-10 lg:col-span-2 lg:flex-row lg:items-center">
        <div className="lg:min-w-0 lg:flex-1">
          <h3 className="text-lg font-semibold leading-8 tracking-tight text-indigo-600">
            Discounted
          </h3>
          <p className="mt-1 text-base leading-7 text-gray-600">
            Dolor dolores repudiandae doloribus. Rerum sunt aut eum. Odit omnis
            non voluptatem sunt eos nostrum.
          </p>
        </div>
        <a
          href="#"
          className="rounded-md px-3.5 py-2 text-sm font-semibold leading-6 text-indigo-600 ring-1 ring-inset ring-indigo-200 hover:ring-indigo-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Buy discounted license <span aria-hidden="true">&rarr;</span>
        </a>
      </div>
    </div>
  );
};

export default Pricing;
