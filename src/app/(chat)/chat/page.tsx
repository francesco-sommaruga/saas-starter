import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import { cva } from "class-variance-authority";

const messages: {
  id: number;
  content: string;
  createdAt: string;
  user: "bot" | "user";
}[] = [
  {
    id: 1,
    content: "Ciao, come posso aiutarti?",
    createdAt: "2021-08-24T14:48:00.000Z",
    user: "bot",
  },
  {
    id: 2,
    content: "Ciao, ho un problema con il mio ordine",
    createdAt: "2021-08-24T14:48:00.000Z",
    user: "user",
  },
  {
    id: 3,
    content: `This error message indicates that the fetch request failed because the hostname kjxoltjzmxhasxzqfnor.supabase.co could not be resolved. This could be due to a few reasons, such as a typo in the hostname or a DNS issue.

    To resolve this issue, you can try the following steps:
    
    Double-check that the hostname is correct and spelled correctly.
    Check your internet connection to ensure that you are connected to the internet.
    Try using a different DNS server. You can try using Google's public DNS server (8.8.8.8) or Cloudflare's DNS server (1.1.1.1).
    If you are using a VPN, try disconnecting from it and see if that resolves the issue.
    If none of these steps work, you can try contacting Supabase support for further assistance.
    
    Double-check that the hostname is correct and spelled correctly.
    Check your internet connection to ensure that you are connected to the internet.
    Try using a different DNS server. You can try using Google's public DNS server (8.8.8.8) or Cloudflare's DNS server (1.1.1.1).
    If you are using a VPN, try disconnecting from it and see if that resolves the issue.
    If none of these steps work, you can try contacting Supabase support for further assistance.`,
    createdAt: "2021-08-24T14:48:00.000Z",
    user: "bot",
  },
];

const messageClasseNames = cva("", {
  variants: {
    user: {
      user: "bg-primary/10 text-primary/90",
      bot: "bg-foreground/10 text-foreground/90",
    },
  },
});

const ChatPage = () => {
  return (
    <div className="flex flex-col w-full h-screen">
      <div className="flex-1 w-full justify-end flex bg-background/30 flex-col h-full ">
        <ScrollArea className="mx-auto w-full">
          {messages.map((message) => (
            <div
              key={message.id}
              className={messageClasseNames({ user: message.user })}
            >
              <div className="max-w-2xl mx-auto py-6 space-y-2 sm:space-y-0 sm:space-x-2 flex-1 sm:flex px-4 sm:px-0">
                <Avatar className="text-foreground">
                  <AvatarFallback>
                    {message.user[0].toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <p>{message.content}</p>
              </div>
            </div>
          ))}
        </ScrollArea>
      </div>
      <div className="flex w-full relative px-2 sm:px-0 max-w-2xl border boder-t border-background items-center space-x-2 mx-auto my-4">
        <Textarea className="flex-1" placeholder="Come possiamo aiutarti?" />
        <Button
          className="absolute right-0 bottom-0"
          variant="ghost"
          type="submit"
        >
          <PaperAirplaneIcon className="text-foreground/70 w-5" />
        </Button>
      </div>
    </div>
  );
};

export default ChatPage;
