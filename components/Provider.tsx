"use client";

import { ProviderProps } from '@interfaces/interfaces';
import { SessionProvider } from 'next-auth/react';

const Provider: React.FC<ProviderProps> = ({ children, session }) =>  (
    <div>
      <SessionProvider session={session}>
        {children}
      </SessionProvider>
    </div>
  )

export default Provider;

