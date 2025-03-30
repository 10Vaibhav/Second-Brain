import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";

// Define the content item type
export interface ContentItem {
    _id: string;
    title: string;
    link: string;
    type: string;
    userId: string;
    tags: string[];
  }

export function useContent() {
  // Specify the array type
  const [contents, setContents] = useState<ContentItem[]>([]);

  async function refresh() {
    axios.get(`${BACKEND_URL}/api/v1/content`, {
      headers: {
        "authorization": localStorage.getItem("token")
      }
    })
    .then((response) => {
      setContents(response.data.content);
    })
    .catch(error => {
      console.error("Error fetching content:", error);
    });
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