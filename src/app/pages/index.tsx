import { useRouter } from "next/router";
import { useEffect } from "react";

const HomePage = () => {
  const router = useRouter();

  useEffect(() => {
    // Redirige a la página de login al montar el componente
    router.push("/login");
  }, [router]);

  // Renderiza un mensaje breve mientras se realiza la redirección
  return <p>Redirigiendo a la página de inicio de sesión...</p>;
};

export default HomePage;
