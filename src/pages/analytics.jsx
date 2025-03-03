import React, { useEffect, useState } from "react";
import styles from "../styles/analytics.module.css";
import { LineGraph, BarGraph, LinksBarGraph, PieGraph } from "../components/chart";
import { getAnalytics,} from "../services/index";

export default function Analytics() {
  const [analytics, setAnalytics] = useState({
    totalShopClicks: 0,
    totalLinkClicks: 0,
    links: [],
    devices: []
  });

  useEffect(() => {
    fetchAnalytics();
  }, []);

  // ✅ Fetch latest analytics data
  async function fetchAnalytics() {
    try {
      const data = await getAnalytics();

      const totalLinkClicks = data.links.reduce((sum, link) => sum + link.clicks, 0);
      const linksData = data.links.map(link => ({
        name: link.title,
        value: link.clicks,
        id: link.id
      }));

      const deviceCounts = data.links.flatMap(link => link.analytics || [])
        .reduce((acc, entry) => {
          acc[entry.device] = (acc[entry.device] || 0) + 1;
          return acc;
        }, {});

      const deviceData = Object.keys(deviceCounts).map(device => ({
        name: device,
        value: deviceCounts[device]
      }));

      setAnalytics({
        totalShopClicks: data.totalShopClicks,
        totalLinkClicks,
        links: linksData,
        devices: deviceData
      });
    } catch (error) {
      console.error("Error fetching analytics:", error);
    }
  }

  // ✅ Handle Clicks (Unified)
  const handleClick = async (type, linkId = null) => {
    try {
      await updateClickCount(type, linkId);
      setAnalytics(prev => ({
        ...prev,
        totalShopClicks: type === "shop" ? prev.totalShopClicks + 1 : prev.totalShopClicks,
        totalLinkClicks: type === "link" ? prev.totalLinkClicks + 1 : prev.totalLinkClicks,
        links: prev.links.map(link =>
          link.id === linkId ? { ...link, value: link.value + 1 } : link
        )
      }));
    } catch (error) {
      console.error(`Error updating ${type} clicks:`, error);
    }
  };

  return (
    <div className={styles.analyticsContainer}>
      <h3>Overview</h3>

      {/* ✅ Click Summary Boxes */}
      <div className={styles.linkboxes}>
        <div className={styles.box} onClick={() => handleClick("shop")}>
          <span>Clicks on Shop</span>
          <p className={styles.count}>{analytics.totalShopClicks}</p>
        </div>
        <div className={styles.box}>
          <span>Clicks on Links</span>
          <p className={styles.count}>{analytics.totalLinkClicks}</p>
        </div>
        <div className={styles.box}>
          <span>Total Clicks (CTC)</span>
          <p className={styles.count}>{analytics.totalLinkClicks + analytics.totalShopClicks}</p>
        </div>
      </div>

      {/* ✅ Graphs Section */}
      <div className={styles.graphsContainer}>
        <div className={styles.graph}><LineGraph data={analytics.links} /></div>
        
        <div className={styles.graphGrid}>
          <div className={styles.graph}><BarGraph data={analytics.devices} /></div>
          <div className={styles.graph}><PieGraph data={analytics.devices} /></div>
        </div>

        <div className={styles.graph}><LinksBarGraph data={analytics.links} /></div>
      </div>

      {/* ✅ Clickable Links */}
      <div className={styles.linksContainer}>
        {analytics.links.map((link, index) => (
          <button 
            key={index} 
            onClick={() => handleClick("link", link.id)} 
            className={styles.linkButton}
          >
            {link.name} (Clicks: {link.value})
          </button>
        ))}
      </div>
    </div>
  );
}
