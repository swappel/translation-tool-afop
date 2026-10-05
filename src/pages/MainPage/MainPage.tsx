import styles from "./MainPage.module.scss";
import StartPrompting from "../../components/StartPrompting/StartPrompting.tsx";
import SearchBar from "../../components/SearchBar/SearchBar.tsx";

function MainPage() {
    return (
        <div className={styles.mainContainer}>
            <SearchBar />

            <div className={styles.contentSection}>
                <StartPrompting />
            </div>
        </div>
    );
}

export default MainPage;    