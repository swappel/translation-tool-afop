import styles from "./MainPage.module.scss";
import SearchBar from "../../components/SearchBar/SearchBar.tsx";
import FileSelectionModal from "../../components/FileSelectionModal/FileSelectionModal.tsx";
import {useState} from "react";

function MainPage() {
    const [isFileSelectionOpen, setFileSelectionOpen] = useState<boolean>(true);

    const handleModalComprete = () => {
        setFileSelectionOpen(false);
    }

    return (
        <div className={styles.mainContainer}>
            <SearchBar />

            <div className={styles.contentSection}>
                {isFileSelectionOpen && <FileSelectionModal onComplete={handleModalComprete} />}
            </div>
        </div>
    );
}

export default MainPage;    