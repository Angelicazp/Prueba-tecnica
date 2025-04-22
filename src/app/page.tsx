"use client"; // Marca este componente como un Componente de Cliente

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    router.push("/login");
  }, [router]);

  return <p>Redirigiendo a la página de inicio de sesión...</p>;
}
