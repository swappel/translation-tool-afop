import styles from "./FileSelectionModal.module.scss";
import { useEffect, useState } from "react";

interface FileSelectionModalProps {
    onComplete: () => void;
}

function FileSelectionModal({ onComplete }: FileSelectionModalProps) {
    const [locpackPath, setLocpackPath] = useState<string>('');
    const [locpackbinPath, setLocpackbinPath] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [isScanning, setIsScanning] = useState<boolean>(false);

    const [currentLine, setCurrentLine] = useState<number>(0);
    const [totalLines, setTotalLines] = useState<number>(0);

    useEffect(() => {
        const unsubscribe = window.api.onNativeEvent('translation-progress', (lineNum: number) => {
            setCurrentLine(lineNum);
        });

        return () => {
            unsubscribe();
        };
    }, []);

    const handleSelectLocpack = async () => {
        if (isScanning) return;
        const filePath = await window.api.sendToNative('select-file', 'locpack');
        if (filePath) {
            setLocpackPath(filePath);
        }
    };

    const handleSelectLocpackbin = async () => {
        if (isScanning) return;
        const filePath = await window.api.sendToNative('select-file', 'locpackbin');
        if (filePath) {
            setLocpackbinPath(filePath);
        }
    };

    const handleScanFiles = async (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        if (isScanning) return;

        if (!locpackPath || !locpackbinPath) {
            setErrorMessage("Please select both files before continuing.");
            return;
        }

        setErrorMessage(null);
        setIsScanning(true);
        setCurrentLine(0);

        try {
            const loadRes = await window.api.loadFiles(locpackPath, locpackbinPath);
            if (!loadRes?.success) {
                setErrorMessage(loadRes?.error || "Failed to load files.");
                setIsScanning(false);
                return;
            }

            const countRes = await window.api.getTotalLines();
            if (countRes?.success && typeof countRes.total === 'number') {
                setTotalLines(countRes.total);
            }

            const verifyRes = await window.api.verifyFiles();

            if (verifyRes?.success) {
                if (totalLines === currentLine) onComplete();
            } else {
                setErrorMessage(verifyRes?.error || "Verification completed with issues.");
            }
        } catch (error) {
            setErrorMessage("An error occurred during file scanning.");
            console.error("IPC scan error:", error);
        } finally {
            setIsScanning(false);
        }
    };

    return (
        <div className={styles.fileSelectionBackground}>
            <div className={styles.fileSelectionBox}>
                <h1 className={styles.modalTitle}>Select Files</h1>
                <p className={styles.explanation}>
                    Please select the ".locpack" and ".locpackbin" files you want to edit. <br/>
                    They should be a pair, like "menus.locpack" and "menus.locpackbin". <br/>
                    If they do not match, there will be an error.
                </p>

                <div className={styles.allInputs}>
                    <label className={styles.inputLabel}>Please select a .locpack file:</label>
                    <div className={styles.inputField}>
                        <input
                            className={styles.inputBox}
                            type="text"
                            value={locpackPath}
                            spellCheck={false}
                            autoCapitalize="off"
                            autoComplete="off"
                            placeholder=".locpack path"
                            readOnly
                        />
                        <button className={styles.selectButton} onClick={handleSelectLocpack} disabled={isScanning}>
                            Select...
                        </button>
                    </div>

                    <label className={styles.inputLabel}>Please select a .locpackbin file:</label>
                    <div className={styles.inputField}>
                        <input
                            className={styles.inputBox}
                            type="text"
                            value={locpackbinPath}
                            spellCheck={false}
                            autoCapitalize="off"
                            autoComplete="off"
                            placeholder=".locpackbin path"
                            readOnly
                        />
                        <button className={styles.selectButton} onClick={handleSelectLocpackbin} disabled={isScanning}>
                            Select...
                        </button>
                    </div>
                </div>

                {/* Progress Bar UI */}
                {isScanning && (
                    <div style={{ marginTop: '1rem', width: '100%' }}>
                        <p style={{ color: '#fff', marginBottom: '0.25rem' }}>
                            Checking line {currentLine.toLocaleString()} / {totalLines.toLocaleString()}
                        </p>
                        <div style={{ background: '#333', borderRadius: '4px', height: '10px', overflow: 'hidden' }}>
                            <div
                                style={{
                                    width: totalLines > 0 ? `${Math.min((currentLine / totalLines) * 100, 100)}%` : '0%',
                                    height: '100%',
                                    background: '#4caf50',
                                    transition: 'width 0.05s linear'
                                }}
                            />
                        </div>
                    </div>
                )}

                {errorMessage && (
                    <p className={styles.errorText}>{errorMessage}</p>
                )}

                <button className={styles.scanButton} onClick={handleScanFiles} disabled={isScanning}>
                    {isScanning ? 'Scanning...' : 'Scan files'}
                </button>
            </div>
        </div>
    );
}

export default FileSelectionModal;