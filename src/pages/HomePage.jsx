import MainTable from "../components/MainTable";
import styles from "../styles/HomePage.module.css";
import BasicButton from "../components/BasicButton.jsx";
import { NavLink } from "react-router-dom";

function HomePage() {
  return (
    <section>
      <NavLink
        to="/admin/add-product"
        className="absolute right-0 top-0 -translate-x-1/2  translate-y-1/2"
      >
        <BasicButton>პანელზე გადასვლა</BasicButton>
      </NavLink>
      <div className={styles.tableContainer}>
        <MainTable></MainTable>
      </div>
    </section>
  );
}

export default HomePage;
