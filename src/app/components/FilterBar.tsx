import React, { useState, useEffect } from "react";
import styles from "../styles/FilterBar.module.css";

interface FilterBarProps {
  onFilter: (filters: { searchTerm: string; userId: string }) => void;
  onReset: () => void;
  initialFilters: { searchTerm: string; userId: string };
}

const FilterBar: React.FC<FilterBarProps> = ({ onFilter, onReset, initialFilters }) => {
  const [searchTerm, setSearchTerm] = useState(initialFilters.searchTerm);
  const [userId, setUserId] = useState(initialFilters.userId);
  const [userOptions, setUserOptions] = useState<number[]>([]);

  useEffect(() => {
    const fetchUserIds = async () => {
      try {
        const response = await fetch("https://jsonplaceholder.typicode.com/users");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log("🚀 ~ FilterBar.tsx:23 ~ fetchUserIds ~ data:", data);
        const ids = [...new Set(data.map((user: { id: number }) => user.id))];
        setUserOptions(ids);
      } catch (error) {
        console.error("Error fetching user IDs:", error);
        setUserOptions([]); // En caso de error, no mostrar opciones
      }
    };

    fetchUserIds();
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    onFilter({ searchTerm: e.target.value, userId });
  };

  const handleUserFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(e.target.value);
    onFilter({ searchTerm, userId: e.target.value });
  };

  const handleResetFilters = () => {
    setSearchTerm("");
    setUserId("");
    onReset();
  };

  return (
    <div className={styles.filterBar}>
      <input
        type="text"
        placeholder="Buscar por título o cuerpo"
        value={searchTerm}
        onChange={handleSearchChange}
        className={styles.searchInput}
      />
      <select value={userId} onChange={handleUserFilterChange} className={styles.select}>
        <option value="">Todos los usuarios</option>
        {userOptions.map((id) => (
          <option key={id} value={String(id)}>
            {id}
          </option>
        ))}
      </select>
      <button onClick={handleResetFilters} className={styles.resetButton}>
        Resetear Filtros
      </button>
    </div>
  );
};

export default FilterBar;
