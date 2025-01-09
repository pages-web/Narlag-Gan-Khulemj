import { getBranchDetail } from '@/sdk/queries/auth';
import Link, { type LinkProps } from 'next/link';
import { cn } from '@/lib/utils';
import { MailIcon, MapPinIcon, PhoneCallIcon } from 'lucide-react';
import Image from '@/components/ui/image';
import { Button } from '@/components/ui/button';
import getConfig from 'next/config';

const Footer = async () => {
  const { branchDetail, name } = await getBranchDetail();
  const { email, phoneNumber, links, address, coordinate } = branchDetail || {};
  const { config } = await getConfig();
  const { logo } = config?.uiOptions || {};
  
  return (
    <footer className="flex flex-col items-center justify-center">
      <hr className="border-t border-gray-300 w-1/1 mx-auto mt-3 container" />
      <h1 className="container mt-5 text-2xl font-normal text-center">Нарлаг ган хүлэмж ХХК</h1>
      {!!branchDetail && (
        <div className="container py-6 grid md:grid-cols-2 justify-center items-center">
          <Col title="">
            <div className="flex justify-center">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2674.146646555774!2d106.881648!3d47.9141999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5d96937a71efc46b%3A0xf084822e8d5268cc!2z0J3QsNGA0LvQsNCzINCl0q_Qu9GN0LzQtg!5e0!3m2!1sen!2smn!4v1736396638860!5m2!1sen!2smn" 
                width="600" 
                height="450"  
                loading="lazy">
              </iframe>
            </div>
          </Col>
          <Col title="">
            <div className="flex justify-center">
              <iframe 
                src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fnarlagkhulemj&tabs=timeline&width=500&height=450&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId" 
                width="500" 
                height="450" 
                scrolling="no"   
                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share">
              </iframe>
            </div>
          </Col>
          <Col title="">
            <div className="mt-6 flex flex-col items-center">
              {!!email && (
                <Url href={'mailto: ' + email}>
                  <MailIcon className="h-5 w-5 mr-2 hover:text-white" />
                  {"Имэйл хаяг: " + email}
                </Url>
              )}
              {!!phoneNumber && (
                <Url href={'tel: ' + phoneNumber} className="flex justify-center items-center">
                  <PhoneCallIcon className="h-5 w-5 mr-2" />
                  {("Утас: " + phoneNumber || '').toString()}
                </Url>
              )}
              <Url
                href={`https://www.google.com/maps/@${coordinate?.longitude},${coordinate?.latitude}`}
                target="_blank"
                className={cn(
                  'items-start -mt-2 h-auto whitespace-normal',
                  (address || '').length < 20 && ''
                )}
              >
                <MapPinIcon className="h-5 w-5" />
                <span className="ml-2 max-w-[300px]">{"Хаяг: " + address}</span>
              </Url>
            </div>
          </Col>
        </div>
      )}
    </footer>
  );
};

const Col = ({
  title,
  children,
}: React.PropsWithChildren & { title: string }) => {
  return (
    <div>
      <h3 className="font-semibold mt-4 uppercase">{title}</h3>
      {children}
    </div>
  );
};

const Url = (
  props: React.PropsWithChildren &
    LinkProps & { className?: string; target?: string }
) => (
  <Button
    asChild
    className={cn(
      'px-0 h-8 flex justify-start pt-8 hover:text-[rgb(41,91,47)]',
      props.className
    )}
    variant="footer"
  >
    <Link {...props} />
  </Button>
);

export default Footer;
