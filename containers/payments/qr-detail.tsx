import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { BanIcon, InfoIcon } from 'lucide-react';
import { DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import BackButton from './back-button';
// import CheckPayment from './check-payment';
import Link from 'next/link';

const getName = (name: string) => {
  return name;
};

const QrDetail = ({
  errorDescription,
  qrCode,
  id,
  urls,
}: {
  errorDescription?: string;
  status: string;
  qrCode: string;
  id: string;
  urls: { name: string; logo: string; link: string }[];
}) => {
  return (
    <div className="relative">
      <div className="max-h-[52vh] overflow-auto pb-14">
        <QrContainer error={errorDescription}>
          {qrCode ? (
            <img
              src={qrCode}
              className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2"
              height={256}
              width={256}
              alt=""
            />
          ) : (
            <BanIcon
              className="h-20 w-20 text-input absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 "
              strokeWidth={1}
            />
          )}
        </QrContainer>
        {!!urls?.length && (
          <div className="pt-4 grid grid-cols-3 gap-4 md:hidden">
            {urls.map((url) => (
              <Button
                className="text-xs flex flex-col gap-1 items-center justify-center px-2 py-3 shadow border border-border/10 h-auto rounded-md"
                variant={'ghost'}
                size="sm"
                asChild
                key={url.name}
              >
                <Link href={url.link}>
                  <img
                    src={url.logo}
                    className="h-12 w-12 block rounded-md object-contain"
                    alt=""
                    height={164}
                    width={164}
                  />
                  <span className="h-4 overflow-hidden mt-1 text-neutral-600">
                    {getName(url.name)}
                  </span>
                </Link>
              </Button>
            ))}
          </div>
        )}
        <DialogFooter className="sm:justify-center gap-1 pt-4 block md:flex space-y-1 sm:space-x-0 md:space-y-0">
          <BackButton />
          {/* <CheckPayment id={id} /> */}
        </DialogFooter>
      </div>
    </div>
  );
};

export const QrContainer = ({
  children,
  loading,
  error,
}: React.PropsWithChildren & { loading?: boolean; error?: string }) => {
  return (
    <>
      <div className="p-4">
        <div className="relative aspect-square mx-auto max-w-[320px]">
          <div className="border rounded-lg absolute inset-0"></div>
          <div className="w-full h-full bg-background rounded-3xl absolute inset-0">
            {children}
          </div>
        </div>
      </div>
      {error ? (
        <Alert variant="destructive">
          <InfoIcon className="h-4 w-4 rotate-180" />
          <AlertTitle>{('Алдаа гарлаа')}</AlertTitle>
          <AlertDescription className="text-xs">{error}</AlertDescription>
        </Alert>
      ) : (
        <Alert variant="warning">
          <InfoIcon className="h-4 w-4" />
          <AlertDescription className="text-xs">
            {(
              'Төлбөр төлөгдсөний дараа таны захиалга идэвхэждэг болохыг анхаараарай! Та өөрийн банкны аппликейшныг ашиглан QR кодыг уншуулж төлбөр төлөх боломжтой'
            )}
          </AlertDescription>
        </Alert>
      )}
      {loading && (
        <DialogFooter className="sm:justify-center gap-2 pt-4 block md:flex space-y-2 md:space-y-0">
          <BackButton disabled />
          <Button size="lg" className="flex-1 w-full" disabled>
            {('Төлбөр шалгах')}
          </Button>
        </DialogFooter>
      )}
    </>
  );
};

export default QrDetail;
