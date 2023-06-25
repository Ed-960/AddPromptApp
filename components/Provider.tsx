"use client";

import { ProviderProps } from '@interfaces/interfaces';
import { SessionProvider } from 'next-auth/react';

const Provider = ({ children, session }: ProviderProps) =>  (
    <div>
      <SessionProvider session={session}>
        {children}
      </SessionProvider>
    </div>
  )

export default Provider;

