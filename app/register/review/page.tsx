"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

// This route is consolidated into /register/confirm. Redirect on the client,
// preserving any query string parameters for continuity.
export default function ReviewRedirectClient() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const qs = searchParams?.toString() || "";
    router.replace(qs ? `/register/confirm?${qs}` : "/register/confirm");
  }, [router, searchParams]);

  return null;
}
