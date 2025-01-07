import { useDetail } from "@/components/order-detail/order-detail";
import { Button } from "@/components/ui/button";
import {
  DialogClose,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { CopyIcon } from "lucide-react";
import Image from "next/image";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useParams } from "next/navigation";
import { useState } from "react";
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';


const Accounts = () => {
  const { locale } = useParams();
  const { totalAmount, number } = useDetail();
  const deliveryfee = 5000
  

  return (
    <>
      <DialogHeader>
        <DialogTitle>{("Банкны шилжүүлэг")}</DialogTitle>
      </DialogHeader>
      <Tabs>
        <TabsList className="w-full h-auto rounded-[8px]">
          {accounts.map((acc, index) => (
            <TabsTrigger
              value={acc.mn}
              key={index}
              className="flex-auto rounded-[6px] md:justify-start h-auto p-2 font-medium whitespace-wrap"
            >
               <Image
                src={acc.logo}
                height={100}
                width={100}
                alt=""
                className="h-7 w-7 rounded-[4px] overflow-hidden object-contain flex-none"
              />
              <span className="whitespace-wrap flex-auto text-center hidden md:inline">
                {acc.mn.replace(" ", "\n")}
              </span>
            </TabsTrigger>
          ))}
        </TabsList>
        {accounts.map((acc, index) => (
          <TabsContent key={index} value={acc.mn}>
            <div className="grid gap-2 md:grid-cols-2 py-2">
              <AccountItem label={("Нэр")} value={acc.firstname} />
              <AccountItem label={("Банкны данс")} value={acc.number} />
              <AccountItem
                label={("Захиалгын нийт дүн")}
                value={`${(totalAmount + deliveryfee).toLocaleString()} ₮`}
                numberValue={totalAmount + deliveryfee}
              />
              <AccountItem label={("Гүйлгээний утга")} value={number || ""} />
            </div>
          </TabsContent>
        ))}
      </Tabs>
      <DialogFooter>
        <DialogClose asChild>
          <Button className="w-full" variant="secondary" size="lg">
            {("Буцах")}
          </Button>
        </DialogClose>
      </DialogFooter>
        <Alert variant="warning">
          <AlertDescription className="text-xs">
            {(
              'Төлбөр төлөгдсөний дараа таны захиалга идэвхэждэг болохыг анхаараарай! Та өөрийн банкны аппликейшныг ашиглан дансны дугаар оруулж төлбөр төлөх боломжтой'
            )}
          </AlertDescription>
        </Alert>

    </>
  );
};

const AccountItem = ({
  label,
  value,
  long,
  numberValue,
}: {
  label: string;
  value: string;
  long?: boolean;
  numberValue?: number;
}) => {
  return (
    <div
      className={cn(
        "bg-muted px-3 py-2 rounded-[8px] relative",
        long && "col-span-2"
      )}
    >
      <div className="text-muted-foreground text-sm font-medium">{label}</div>
      <div className="font-semibold">{value}</div>
      <Copy value={numberValue ? numberValue + "" : value} />
    </div>
  );
};

const Copy = ({ value }: { value: string }) => {
  const [hover, setHover] = useState(false);
  const [success, setSuccess] = useState(false);
  const handleClick = () =>
    navigator.clipboard.writeText(value).then(() => {
      setSuccess(true);
      setTimeout(() => setSuccess(false), 2000);
    });

  return (
    <TooltipProvider>
      <Tooltip open={hover}>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-1/2 -translate-y-1/2 right-2"
            onClick={handleClick}
            onMouseOver={() => setHover(true)}
            onMouseOut={() => setHover(false)}
          >
            {success ? (
              <CopyIcon
                className="stroke-green-500 h-6 w-6"
                strokeWidth={1.5}
              />
            ) : (
              <CopyIcon className="h-5 w-5" strokeWidth={1.5} />
            )}
          </Button>
        </TooltipTrigger>
        <TooltipContent className="bg-background text-foreground">
          <p>{success ? "Амжилттай хуулсан" : "Хуулах"}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

const accounts = [
  {
    mn: "Голомт банк",
    number: "11111111",
    firstname: "Test",
    logo: "https://play-lh.googleusercontent.com/9tUBesUsI4UIkpgO1MPIMLFvhDa_4vZE75TrVAUHFA7a0bJ7IIgeyh2r1QXs9VlmXmkX=w480-h960-rw",
  },
];

export default Accounts;
