import styles from "./MainPage.module.scss";
import SearchBar from "../../components/SearchBar/SearchBar.tsx";
import FileSelectionModal from "../../components/FileSelectionModal/FileSelectionModal.tsx";
import { useState } from "react";
import LineTable from "../../components/LineTable/LineTable.tsx";
import type { LocaleLineData } from "../../types/electron";
import LineEditingModal from "../../components/LineEditingModal/LineEditingModal.tsx";

interface SelectedLineState {
    index: number;
    data: LocaleLineData;
}

function MainPage() {
    const [isFileSelectionOpen, setFileSelectionOpen] = useState<boolean>(true);
    const [isLineTableShown, setLineTableShown] = useState<boolean>(false);
    const [pageSize, setPageSize] = useState<number>(100);
    const [selectedLine, setSelectedLine] = useState<SelectedLineState | null>(null);

    const handleModalComplete = () => {
        setFileSelectionOpen(false);
        setLineTableShown(true);
    };

    const handleLineSelect = (line: LocaleLineData, index: number) => {
        setSelectedLine({ index, data: line });
    };

    const handleSaveLine = async () => {
        setSelectedLine(null);
    };

    const handleCancelEdit = () => {
        setSelectedLine(null);
    };

    return (
        <div className={styles.mainContainer}>
            <SearchBar onPageSizeChange={setPageSize} pageSize={pageSize} />

            <div className={styles.contentSection}>
                {isFileSelectionOpen && <FileSelectionModal onComplete={handleModalComplete} />}

                {isLineTableShown && (
                    <LineTable
                        pageSize={pageSize}
                        onLineSelect={handleLineSelect}
                    />
                )}

                {selectedLine && (
                    <LineEditingModal
                        index={selectedLine.index}
                        oldLineData={selectedLine.data}
                        onSave={handleSaveLine}
                        onCancel={handleCancelEdit}
                    />
                )}
            </div>
        </div>
    );
}

export default MainPage;