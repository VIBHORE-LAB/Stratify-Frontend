import { useState, useEffect } from "react";

export function useUserId(): string | null {
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    try {
      const storedId = localStorage.getItem("userId");
      if (storedId) setUserId(storedId);
    } catch (err) {
      console.error("Failed to read userId from localStorage:", err);
      setUserId(null);
    }
  }, []);

  return userId;
}
