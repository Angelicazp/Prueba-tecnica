"use client";
import React from "react";
import { useAuth } from "../contexts/AuthContext";
//import ProtectedRoute from "../components/ProtectedRoute";
import styles from "../styles/Dashboard.module.css";
import ClientProtectedRoute from "../components/ClientProtectedRoute";
import { useRouter } from "next/navigation";

const DashboardPage: React.FC = () => {
  const { user, logout } = useAuth();

  const router = useRouter();
  const listado = () => {
    router.push("/posts");
  };
  return (
    <ClientProtectedRoute>
      <div className={styles.container}>
        <h1>Dashboard</h1>
        {user && <p>Bienvenido, {user}</p>}
        <button onClick={listado} className={styles.button}>
          Ir a Listado
        </button>
        <button onClick={logout} className={styles.logoutButton}>
          Cerrar Sesión
        </button>
      </div>
    </ClientProtectedRoute>
  );
};

export default DashboardPage;
