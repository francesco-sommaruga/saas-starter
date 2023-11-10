"use client";
import { memo, useState } from "react";
import {
  Card,
  CardDescription,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { handleSignup } from "@/components/auth/actions";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { AppleIcon, GoogleIcon } from "@/components/auth/Icons";
import SocialLogin from "../SocialLogin";

const text = {
  signIn: {
    firstPart: "Already have an account?",
    link: "Sign In",
    href: "/auth/login",
  },
  signUpButton: "Sign Up",
};

const SignUpCard = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { push } = useRouter();

  const { toast } = useToast();
  return (
    <div className="w-full">
      <SocialLogin />

      <div className="pt-10">
        <div className="mb-2">
          <Label htmlFor="email">Email</Label>
        </div>
        <Input
          name="email"
          placeholder="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="mt-6">
        <div className="flex align-baseline justify-between mb-3">
          <Label htmlFor="password">Password</Label>
        </div>
        <div className="relative">
          <Input
            name="password"
            placeholder="password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            onClick={() => setShowPassword((prev) => !prev)}
            variant={"ghost"}
            className="absolute right-0 bottom-0 z-10"
          >
            {!showPassword ? (
              <EyeIcon className="text-foreground h-6 w-6" />
            ) : (
              <EyeSlashIcon className="text-foreground h-6 w-6" />
            )}
          </Button>
        </div>
      </div>
      <Button
        className="w-full mt-4"
        size="lg"
        onClick={async () => {
          const { data, error } = await handleSignup({ email, password });
          if (error) {
            console.log(error);
            toast({
              title: "Error",
              description: error.message,
              variant: "destructive",
            });
          } else {
            toast({
              title: "Check Your Email!",
              description: "We have sent you a confirmation email.",
            });

            push("/dashboard");
          }
        }}
      >
        {text.signUpButton}
      </Button>

      <h3 className="mt-16 text-center">
        <span className="text-foreground/70">{text.signIn.firstPart}</span>{" "}
        <Link
          href={text.signIn.href}
          className="font-bold text-secondary hover:text-secondary/80 cursor-pointer hover:underline"
        >
          {text.signIn.link}
        </Link>
      </h3>
    </div>
  );
};

export default memo(SignUpCard);
