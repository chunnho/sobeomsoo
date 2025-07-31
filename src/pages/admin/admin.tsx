import { useState } from "react";
import WorksAdmin from "./components/worksAdmin/worksAdmin";
import ExhibitionAdmin from "./components/exhibitionAdmin/exhibitionAdmin";
import styles from "./admin.module.scss";

export default function Admin() {
  const [activeTab, setActiveTab] = useState<"works" | "exhibition">("works");

  // 에러 처리 추가
  try {
    return (
      <div className={styles.adminContainer}>
        <nav>
          <button 
            className={activeTab === "works" ? styles.active : ""}
            onClick={() => setActiveTab("works")}
          >
            Works
          </button>
          <button 
            className={activeTab === "exhibition" ? styles.active : ""}
            onClick={() => setActiveTab("exhibition")}
          >
            Exhibition
          </button>
        </nav>

        <div className={styles.content}>
          {activeTab === "works" && <WorksAdmin />}
          {activeTab === "exhibition" && <ExhibitionAdmin />}
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error in Admin component:", error);
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <h1>Admin Page Error</h1>
        <p>Something went wrong loading the admin page.</p>
        <pre>{error instanceof Error ? error.message : 'Unknown error'}</pre>
      </div>
    );
  }
}
