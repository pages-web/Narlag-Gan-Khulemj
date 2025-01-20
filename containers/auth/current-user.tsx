'use client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { useCurrentUser } from '@/sdk/queries/auth.client';
import { Loader2Icon } from 'lucide-react';
import Link from 'next/link';
import { useEffect } from 'react';
// import { UserIcon } from '@/sdk/queries/auth.client';
import { UserIcon } from 'lucide-react';
const CurrentUser = () => {
  const { currentUser, setLoading, loading } = useCurrentUser();

  useEffect(() => {
    if (!sessionStorage.getItem('token')) {
      setLoading(false);
    }
  }, []);

  if (loading)
    return (
      <div className="h-9 w-9 flex items-center justify-center">
        <Loader2Icon className="h-5 w-5 animate-spin" />
      </div>
    );

  if (currentUser) {
    const { firstName, avatar, lastName } = currentUser;
    return (
      <Avatar asChild>
        <Link href="/profile">
          <AvatarImage src={avatar} alt={currentUser.firstName} />
          <AvatarFallback>
            {(firstName || 'P')[0]}
            {(lastName || '')[0]}
          </AvatarFallback>
        </Link>
      </Avatar>
    );
  }

  return (
    <Button
      size="login"
      variant="none_color"
      asChild
      className="relative shadow-none hover:bg-background/10 text-inherit hover:text-inherit"
    >
      {/* <Link href="/login" className='border-2 border-[rgb(41,91,47)] rounded-lg'>
        Нэвтрэх
      </Link> */}
      <Link href="/login">
        <UserIcon className="h-5 w-5" />
      </Link>
    </Button>
  );
};

export default CurrentUser;
