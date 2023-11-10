"use client";
import { GoogleIcon } from "@/components/auth/Icons";
import { handleGoogleLogin } from "@/components/auth/actions";
import { Button } from "@/components/ui/button";

export default function GoogleLoginButton() {
  return (
    <Button
      onClick={handleGoogleLogin}
      variant={"outline"}
      className="md:flex-1"
    >
      <GoogleIcon className="fill-foreground/70 h-5 mr-2" />
      Sign Up with Google
    </Button>
  );
}
