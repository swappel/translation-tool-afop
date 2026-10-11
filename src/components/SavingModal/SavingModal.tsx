import styles from "./SavingModal.module.scss";
import {useState} from "react";

interface SavingModalProps {
    onSaveSuccess: (newPath: string) => void;
    onCancel: () => void;
}

function SavingModal({ onSaveSuccess, onCancel } : SavingModalProps ){
    const [path, setPath] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const handleSelectPath = async () => {
        const savePath = await window.api.sendToNative('select-save-location')
        if (savePath) {
            setPath(savePath);
        }
    };

    const handleSaveClick = async () => {
        const saveFilesRes = await window.api.saveToFiles(path);
        if (!saveFilesRes?.success) {
            setErrorMessage(saveFilesRes?.error || "Failed to save files.");
            return;
        }

        onSaveSuccess(path);
    };

    return (
        <div className={styles.savingModalBackground}>
            <div className={styles.savingSelectionBox}>
                <h1 className={"modalTitle"}>Select saving location</h1>
                <p className={styles.explanation}>
                    Please create or select a .locpack or .locpackbin file<br/>
                    to save the edited content in.<br/>
                    A backup copy of the original, unedited file will be created in the same directory.
                </p>

                <div className={styles.allInputs}>
                    <label className={styles.inputLabel}>Please select or create a .locpack(bin) file:</label>
                    <div className={styles.inputField}>
                        <input
                            className={styles.inputBox}
                            type="text"
                            value={path}
                            spellCheck={false}
                            autoCapitalize="off"
                            autoComplete="off"
                            placeholder="Save path"
                            readOnly
                        />
                        <button className={styles.selectButton} onClick={handleSelectPath}>
                            Select...
                        </button>
                    </div>
                </div>

                {errorMessage && (
                    <p className={styles.errorText}>{errorMessage}</p>
                )}

                <div className={styles.buttonSection}>
                    <button className={styles.cancelButton} onClick={onCancel}>Cancel</button>
                    <button className={styles.saveButton} onClick={handleSaveClick}>Save to files</button>
                </div>
            </div>
        </div>
    );
}

export default SavingModal;