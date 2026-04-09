"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect, useRef } from "react";

export function ReloadAfterClerkSignIn() {
  const { isSignedIn, isLoaded } = useUser();
  const prevSignedInRef = useRef<boolean | undefined>(undefined);

  useEffect(() => {
    if (!isLoaded) return;

    const prev = prevSignedInRef.current;
    if (prev === false && isSignedIn === true) {
      window.location.reload();
      return;
    }

    prevSignedInRef.current = isSignedIn;
  }, [isLoaded, isSignedIn]);

  return null;
}
