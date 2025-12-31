import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";

export interface ContentItem {
    _id: string;
    title: string;
    link: string;
    type: string;
    userId: string;
    tags: string[];
  }

export function useContent() {
  const [contents, setContents] = useState<ContentItem[]>([]);

  async function refresh() {
    const token = localStorage.getItem("token");
    
    if (!token) {
      window.location.href = "/signin";
      return;
    }

    try {
      const response = await axios.get(`${BACKEND_URL}/api/v1/content`, {
        headers: {
          "authorization": token
        }
      });
      setContents(response.data.content);
    } catch (error: any) {
      console.error("Error fetching content:", error);
      
      if (error.response && (error.response.status === 401 || error.response.status === 403)) {
        localStorage.removeItem("token");
        window.location.href = "/signin";
      }
    }
  }

  useEffect(() => {
    refresh();

    const interval = setInterval(() => {
      refresh();
    }, 10 * 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return { contents, refresh };
}