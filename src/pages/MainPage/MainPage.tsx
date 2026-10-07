import styles from "./MainPage.module.scss";
import SearchBar from "../../components/SearchBar/SearchBar.tsx";
import FileSelectionModal from "../../components/FileSelectionModal/FileSelectionModal.tsx";
import {useState} from "react";
import LineTable from "../../components/LineTable/LineTable.tsx";

function MainPage() {
    const [isFileSelectionOpen, setFileSelectionOpen] = useState<boolean>(true);
    const [isLineTableShown, setLineTableShown] = useState<boolean>(false);
    const [pageSize, setPageSize] = useState<number>(100);

    const handleModalComplete = () => {
        setFileSelectionOpen(false);
        setLineTableShown(true);
    }

    return (
        <div className={styles.mainContainer}>
            <SearchBar onPageSizeChange={setPageSize} pageSize={pageSize}/>

            <div className={styles.contentSection}>
                {isFileSelectionOpen && <FileSelectionModal onComplete={handleModalComplete} />}
                {isLineTableShown && <LineTable pageSize={pageSize} />}
            </div>
        </div>
    );
}

export default MainPage;    