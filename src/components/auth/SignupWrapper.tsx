"use client";

import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import Signup from "@/components/auth/Signup";
import AccountExistsPopup from "@/components/ui/AccountExistsPopup";

export default function SignupWrapper() {
  const searchParams = useSearchParams();
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    if (searchParams.get('error') === 'AccountExists') {
      setShowPopup(true);
    }
  }, [searchParams]);

  return (
    <>
      <Signup />
      <AccountExistsPopup 
        show={showPopup} 
        onClose={() => {
          setShowPopup(false);
          window.location.href = '/auth/login';
        }} 
      />
    </>
  );
}