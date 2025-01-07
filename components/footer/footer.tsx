import { Button } from '../ui/button';
import { getBranchDetail } from '@/sdk/queries/auth';
import Link, { type LinkProps } from 'next/link';
import { cn } from '@/lib/utils';
import { MailIcon, MapPinIcon, MoveRight, PhoneCallIcon } from 'lucide-react';
import ErxesLogo from './erxes-logo';
import { icons } from './icons';
import Image from '@/components/ui/image';
import { TypewriterEffect } from '../ui/typewriter';
import { TextUp } from './animate.client';

const Footer = async () => {
  const { branchDetail, name } = await getBranchDetail();
  const { email, phoneNumber, links, address, coordinate } = branchDetail || {};

  return (
    <footer className="pt-12">
      {!!branchDetail && (
        <div className='bg-[rgb(41,91,47)]'>
          <div className="container py-6 grid md:grid-cols-4">
            <Col title="Бидний тухай">
              <FooterLink href="/about">Бидний тухай</FooterLink>
            </Col>
            <Col title="Туслах цэс">
              <FooterLink href="/terms-of-service">
                Үйлчилгээний нөхцөл
              </FooterLink>
              <FooterLink href="/privacy-policy">Нууцлалын бодлого</FooterLink>
            </Col>

            <Col title='Төсөлүүд'>
            
            
            </Col>

            <Col title="Биднийг дагаарай">
              <FooterLink
                href={`https://maps.app.goo.gl/5NDvqDwhgTFTcwMB9`}
                target="_blank"
                className={cn(
                  'items-start -mt-1 h-auto whitespace-normal',
                  (address || '').length < 20 && 'items-center'
                )}
              >
                
              <MapPinIcon className="flex-none h-5 w-5 mt-1" />
              <span className="ml-2 text-wrap">{address || ''} </span>
                </FooterLink>
                {!!email && (
                  <FooterLink href={'mailto: ' + email} target="_blank">
                    <MailIcon className="h-5 w-5 mr-2" />
                    {email}
                  </FooterLink>
                )}
                {!!phoneNumber && (
                  <FooterLink href={'tel: ' + phoneNumber} target="_blank">
                    <PhoneCallIcon className="h-5 w-5 mr-2" />
                    {(phoneNumber || '').toString()}
                  </FooterLink>
                )}
                {/* <div className="flex items-center pb-2 gap-1 -ml-2">
                  {Object.keys(links || {}).map(link =>
                    !!links[link] ? (
                      <SocialLink
                        href={(links || {})[link] || ''}
                        icon={link}
                        key={link}
                      >
                        {link}
                      </SocialLink>
                    ) : null
                  )}
                </div> */}
            </Col>
      
          </div>
        </div>
      )}
      <div className="text-primary py-4 text-sm pb-32 md:py-4 bg-[#1f3823]"> 
        <div className="container flex items-center justify-between">
          <div className='text-white'>
            © {new Date().getFullYear()} <span>{name}</span>
          </div>
          <div className="inline-flex items-center group">
            <Button
              className="px-1 text-primary hover:no-underline font-normal h-7"
              variant="link"
              asChild
            >
              <Link href="https://erxes.mn/" target="_blank" className='text-white'>
                Powered by.
                <ErxesLogo className="ml-1 h-7 w-14 fill-white text-white" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
};

const Col = ({
  title,
  children
}: React.PropsWithChildren & { title: string }) => {
  return (
    <div className="">
      <h3 className="font-medium pt-4 pb-2 capitalize text-white">{title}</h3>
      {children}
    </div>
  );
};

const FooterLink = (
  props: React.PropsWithChildren &
    LinkProps & { className?: string; target?: string }
) => (
  <Button
    asChild
    className={cn(
      'px-0 h-8 flex justify-start text-white  font-normal',
      props.className
    )}
    variant="link"
  >
    <Link {...props} />
  </Button>
);

const SocialLink = (
  props: React.PropsWithChildren &
    LinkProps & { className?: string; icon: string }
) => (
  <Button
    asChild
    className={cn('text-xl shadow-none text-white', props.className)}
    size="icon"
    variant="ghost"

  >
    <Link {...props}>{icons[props.icon as keyof typeof icons]}</Link>
  </Button>
);

export default Footer;
