'use client';

import { useEffect, useState, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import NotFound from '../not-found';

interface AdminGuardProps {
  children: ReactNode;
}

const AdminGuard = ({ children }: AdminGuardProps) => {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false); 
  const [loading, setLoading] = useState(true); 
  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    const roles = JSON.parse(localStorage.getItem('roles') || '[]') as string[];

    if (!accessToken || !roles.includes('Admin')) {
      setIsAuthorized(false); 
      router.replace('/notFound');
      router.push('/notFound'); 
    } else {
      setIsAuthorized(true); 
    }
    setLoading(false); 
  }, [router]);

  if (loading) {
    return  null; 
  }

  return isAuthorized ? <>{children}</> :null;
};

export default AdminGuard;
