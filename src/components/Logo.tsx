import { ChatBubbleBottomCenterIcon } from "@heroicons/react/24/outline";
import constants from "@/constants";
import { cva } from "class-variance-authority";

const IconVariants = cva("mr-2", {
  variants: {
    size: {
      default: "h-6",
      xl: "h-12",
    },
  },
});

const TextVariants = cva("text-xl font-black tracking-tight", {
  variants: {
    size: {
      default: "text-xl",
      xl: "text-5xl",
    },
  },
});

const Logo = ({ size = "default" }: { size?: "xl" | "default" }) => {
  return (
    <div className="flex h-16 shrink-0 items-center">
      {/* <img
      className="h-8 w-auto"
      src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
      alt="Your Company"
    /> */}
      <ChatBubbleBottomCenterIcon className={IconVariants({ size })} />
      <span className={TextVariants({ size })}>{constants.app.name}</span>
    </div>
  );
};

export default Logo;
