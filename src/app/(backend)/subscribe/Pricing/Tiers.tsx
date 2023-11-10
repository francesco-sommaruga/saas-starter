import { cn } from "@/lib/utils";
import { Database } from "@/types/supabase";
import CheckIcon from "@heroicons/react/24/outline/CheckIcon";

type Product = Database["public"]["Tables"]["products"]["Row"];
type Price = Database["public"]["Tables"]["prices"]["Row"];
interface ProductWithPrices extends Product {
  prices: Price[];
}

interface Props {
  billingInterval: BillingInterval;
  product: ProductWithPrices;
  priceString: string;
  checkoutButton: React.ReactNode;
  highlightedProduct: string;
}

type BillingInterval = "lifetime" | "year" | "month" | "day" | "week";

const Tier = ({
  product,
  priceString,
  billingInterval,
  checkoutButton,
  highlightedProduct,
}: Props) => {
  return (
    <div
      className={cn(
        "rounded-lg divide-y p-4 divide-zinc-600 shadow-xl bg-white mb-10 ring-1 ring-gray-900/10",
        {
          "border-2 border-secondary": product.name === highlightedProduct,
        }
      )}
    >
      <div className="p-6 flex flex-col h-full">
        <h2 className="text-2xl font-semibold leading-6 text-zinc-900">
          {product.name}
        </h2>
        <p className="mt-4 text-zinc-600">{product.description}</p>
        <p className="mt-8">
          <span className="text-5xl font-extrabold text-zinc-900">
            {priceString}
          </span>
          <span className="text-base font-medium text-zinc-900">
            /{billingInterval}
          </span>
        </p>
        <ul
          role="list"
          className="mt-10 flex-1 space-y-4 text-sm leading-6 text-zinc-600"
        >
          {product.features &&
            product.features.map(({ name }: any) => (
              <li key={name} className="flex gap-x-3">
                <CheckIcon
                  className="h-6 w-5 flex-none text-sexondary"
                  aria-hidden="true"
                />
                {name}
              </li>
            ))}
        </ul>
        {checkoutButton}
      </div>
    </div>
  );
};

export default Tier;

// {/* <div className="flex flex-col justify-between rounded-3xl bg-white p-8 shadow-xl ring-1 ring-gray-900/10 sm:p-10">
// <div>
//   <h3
//     id={product.id}
//     className="text-base font-semibold leading-7 text-indigo-600"
//   >
//     {product.name}
//   </h3>
//   <div className="mt-4 flex items-baseline gap-x-2">
//     <span className="text-5xl font-bold tracking-tight text-gray-900">
//       {priceString}
//     </span>
//     <span className="text-base font-semibold leading-7 text-gray-600">
//       /{billingInterval}
//     </span>
//   </div>
//   <p className="mt-6 text-base leading-7 text-gray-600">
//     {product.description}
//   </p>
//   <ul
//     role="list"
//     className="mt-10 space-y-4 text-sm leading-6 text-gray-600"
//   >
//     {/* {tier.features.map((feature) => (
//       <li key={feature} className="flex gap-x-3">
//         <CheckIcon
//           className="h-6 w-5 flex-none text-indigo-600"
//           aria-hidden="true"
//         />
//         {feature}
//       </li>
//     ))} */}
//   </ul>
// </div>
// {checkoutButton}
// </div> */}
