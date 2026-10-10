import styles from "./MainPage.module.scss";
import SearchBar from "../../components/SearchBar/SearchBar.tsx";
import FileSelectionModal from "../../components/FileSelectionModal/FileSelectionModal.tsx";
import { useState } from "react";
import LineTable from "../../components/LineTable/LineTable.tsx";
import type { LocaleLineData } from "../../types/electron";
import LineEditingModal from "../../components/LineEditingModal/LineEditingModal.tsx";
import SavingModal from "../../components/SavingModal/SavingModal.tsx";

interface SelectedLineState {
    index: number;
    data: LocaleLineData;
}

function MainPage() {
    const [isFileSelectionOpen, setFileSelectionOpen] = useState<boolean>(true);
    const [isLineTableShown, setLineTableShown] = useState<boolean>(false);
    const [pageSize, setPageSize] = useState<number>(100);
    const [selectedLine, setSelectedLine] = useState<SelectedLineState | null>(null);
    const [refreshTrigger, setRefreshTrigger] = useState<number>(0);

    const [isSaveLocationModalOpen, setSaveLocationModalOpen] = useState<boolean>(false);

    const handleModalComplete = () => {
        setFileSelectionOpen(false);
        setLineTableShown(true);
    };

    const handleLineSelect = (line: LocaleLineData, index: number) => {
        setSelectedLine({ index, data: line });
    };

    const handleCancelEdit = () => {
        setSelectedLine(null);
    };

    const handleSaveButtonClick = ()=> {
        setLineTableShown(false);
        setSaveLocationModalOpen(true);
    }

    const onSaveSuccess = (newPath: string) => {
        console.log("New save path: " + newPath);
        setSaveLocationModalOpen(false);
        setLineTableShown(true);
    }

    const handleSaveLine = async (newLineData: LocaleLineData) => {
        try {
            const res = await window.api.saveChange(newLineData);
            if (res.success) {
                setSelectedLine(null);
                setRefreshTrigger((prev) => prev + 1);
            } else {
                console.error("Failed to save line: ", res.error);
            }
        } catch (error) {
            console.error("Error saving line: ", error);
        }
    };

    return (
        <div className={styles.mainContainer}>
            <SearchBar onPageSizeChange={setPageSize} pageSize={pageSize} onSaveClick={handleSaveButtonClick} />

            <div className={styles.contentSection}>
                {isFileSelectionOpen && <FileSelectionModal onComplete={handleModalComplete} />}

                {isLineTableShown && (
                    <LineTable
                        pageSize={pageSize}
                        onLineSelect={handleLineSelect}
                        refreshTrigger={refreshTrigger}
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

                {isSaveLocationModalOpen && (
                    <SavingModal
                        onSaveSuccess={onSaveSuccess}
                    />
                )}
            </div>
        </div>
    );
}

export default MainPage;