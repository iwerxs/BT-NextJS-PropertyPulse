"use client";
import { SessionProvider } from "next-auth/react";

//is a wrapper
const AuthProvider = ({ children }) => {
  return (
    <>
      <SessionProvider>{children}</SessionProvider>
    </>
  );
};

export default AuthProvider;
