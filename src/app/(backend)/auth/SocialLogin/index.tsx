import { Separator } from "@/components/ui/separator";
import GoogleLoginButton from "./GoogleLoginButton";

export default function SocialLogin() {
  return (
    <>
      <div className="mt-10 flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2">
        <GoogleLoginButton />
        {/* add other providers here */}
        {/* <Button variant={"outline"} className="md:flex-1">
          <AppleIcon className="fill-foreground/70 h-6 mr-2" />
          Sign Up with Apple
        </Button> */}
      </div>
      <Separator className="mt-10" />
    </>
  );
}
