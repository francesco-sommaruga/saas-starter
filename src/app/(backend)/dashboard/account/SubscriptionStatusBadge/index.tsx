import { Badge } from "@/components/ui/badge";
import PastDueStatusBadge from "./PastDueStatusBadge";
import moment from "moment";

const SubscriptionStatusBadge = ({
  status,
  cancelAt,
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
  cancelAt: string | null;
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

  if (status === "past_due") return <PastDueStatusBadge status={status} />;

  if (cancelAt)
    return (
      <Badge className=" cursor-default">
        Expires on: {moment(cancelAt).format("DD-MM-YYYY")}
      </Badge>
    );

  return (
    <Badge className=" cursor-default" variant={"secondary"}>
      {formatStatus(status)}
    </Badge>
  );
};

export default SubscriptionStatusBadge;
