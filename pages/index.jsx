// pages/index.jsx
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/addSchool"); // Redirect to your actual page
  }, [router]);

  return null; // or a loading spinner
}