"use client";

import { Toaster } from "sonner";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <Toaster
        position="bottom-right"
        toastOptions={{
          classNames: {
            toast:
              "!border-white/10 !bg-[#0D1016] !text-[#F3F5F7] !shadow-[0_24px_64px_rgba(0,0,0,0.35)]",
            description: "!text-[#B8BEC9]"
          }
        }}
      />
    </>
  );
}
