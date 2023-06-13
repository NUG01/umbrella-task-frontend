import MainTable from "../components/MainTable";
import styles from "../styles/HomePage.module.css";
import BasicButton from "../components/BasicButton.jsx";
import { NavLink } from "react-router-dom";
import BasicAxios from "../lib/axios";
import { useState, useEffect } from "react";

function HomePage() {
  const [isFetched, setIsFetched] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const res = await BasicAxios.get("products");
        setData(res.data);
        setIsFetched(true);
      } catch (error) {}
    })();
  }, []);

  if (!isFetched) return;
  return (
    <section>
      <NavLink
        to="/admin/add-product"
        className="absolute right-0 top-0 -translate-x-1/2  translate-y-1/2"
      >
        <BasicButton>პანელზე გადასვლა</BasicButton>
      </NavLink>
      <div className={styles.tableContainer}>
        <MainTable data={data}></MainTable>
      </div>
    </section>
  );
}

export default HomePage;
