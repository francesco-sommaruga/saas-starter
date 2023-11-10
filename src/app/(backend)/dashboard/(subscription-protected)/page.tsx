import ThemeSwitchButton from "@/components/ThemeSwitchButton";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogFooter,
  DialogHeader,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";

export default function Home() {
  return (
    <main className="p-8">
      <Dialog>
        <DialogTrigger asChild>
          <Button size="sm" className="w-max">
            Crea Nuovo Chatbot
          </Button>
        </DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>Crea Nuovo Chatbot</DialogTitle>
          </DialogHeader>{" "}
          <div>
            <Label htmlFor="bot-name">Name</Label>
            <Input name="bot-name" />
          </div>
          <DialogFooter>
            <Button className="w-max">Crea</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </main>
  );
}
