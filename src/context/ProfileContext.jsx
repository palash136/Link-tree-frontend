import { createContext, useContext, useState, useEffect } from "react";
import { getLinks, addLink } from "../services/index"; // ✅ Import API functions

const ProfileContext = createContext();

export function ProfileProvider({ children }) {
  const [profileImage, setProfileImage] = useState(null);
  const [links, setLinks] = useState([]); // ✅ Store links in state

  // 📌 Fetch Links on Load
  useEffect(() => {
    async function fetchLinks() {
      try {
        const fetchedLinks = await getLinks();
        setLinks(fetchedLinks);
      } catch (error) {
        console.error("Error fetching links:", error.message);
      }
    }
    fetchLinks();
  }, []);

  // 📌 Function to Add a Link
  async function handleAddLink(title, url) {
    try {
      const newLink = await addLink({ title, url }); // ✅ Send to backend
      setLinks((prevLinks) => [...prevLinks, newLink]); // ✅ Update UI instantly
    } catch (error) {
      console.error("Failed to add link:", error.message);
    }
  }

  return (
    <ProfileContext.Provider value={{ profileImage, setProfileImage, links, setLinks, handleAddLink }}>
    {children}
  </ProfileContext.Provider>
);
}

export function useProfile() {
  return useContext(ProfileContext);
}
