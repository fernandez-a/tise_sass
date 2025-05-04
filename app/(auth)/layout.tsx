// app/auth/layout.tsx

import { ReactNode } from 'react';

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen items-center justify-center bg-black">
      <div className="w-full max-w-md p-4 lg:p-8 space-y-6 bg-white dark:bg-gray-800 rounded shadow-lg">
        {children}
      </div>
    </div>
  );
}
