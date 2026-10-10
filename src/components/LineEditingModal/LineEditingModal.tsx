import styles from "./LineEditingModal.module.scss";
import type { LocaleLineData } from "../../types/electron";
import { useState } from "react";
import Separator from "../Separator/Separator.tsx";

interface LineEditingModalProps {
    index: number;
    oldLineData: LocaleLineData;
    onSave: (newLineData: LocaleLineData) => void;
    onCancel: () => void;
}

function LineEditingModal({ index, oldLineData, onSave, onCancel }: LineEditingModalProps) {
    const [fieldAValue, setFieldAValue] = useState<number>(oldLineData.fields[0]);
    const [fieldBValue, setFieldBValue] = useState<number>(oldLineData.fields[1]);
    const [lineContent, setLineContent] = useState<string>(oldLineData.content);

    const onSavePress = () => {
        const newLine: LocaleLineData = {
            ...oldLineData,
            content: lineContent,
            fields: [fieldAValue, fieldBValue, ...oldLineData.fields.slice(2)]
        };

        onSave(newLine);
    };

    return (
        <div className={styles.editLineModalBackground}>
            <div className={styles.editLineModalBox}>
                <h1 className={"modalTitle"}>Edit line</h1>

                <div className={styles.lineInformationFields}>
                    <div className={styles.lineInfoSection}>
                        <label>Index</label>
                        <p className={styles.lineInfoField}>{index}</p>
                    </div>

                    <div className={styles.lineInfoSection}>
                        <label>Hash</label>
                        <p className={styles.lineInfoField}>{oldLineData.hash}</p>
                    </div>
                </div>

                <Separator lineWidth={"1px"} length={"95%"} horizontal={true} />

                <div className={styles.lineEditingFields}>
                    <div className={styles.numberEditFields}>
                        <div className={styles.numberEditField}>
                            <label>A</label>
                            <input
                                className={styles.lineEditingNumberField}
                                type="number"
                                value={fieldAValue}
                                onChange={(e) => setFieldAValue(Number(e.target.value))}
                            />
                        </div>

                        <div className={styles.numberEditField}>
                            <label>B</label>
                            <input
                                className={styles.lineEditingNumberField}
                                type="number"
                                value={fieldBValue}
                                onChange={(e) => setFieldBValue(Number(e.target.value))}
                            />
                        </div>
                    </div>

                    <div className={styles.contentEditingContainer}>
                        <label>Content</label>
                        <textarea
                            value={lineContent}
                            onChange={(e) => setLineContent(e.target.value)}
                        />
                    </div>
                </div>

                <div className={styles.controlButtons}>
                    <button className={styles.cancelButton} onClick={onCancel}>
                        Cancel
                    </button>
                    <button className={styles.saveButton} onClick={onSavePress}>
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
}

export default LineEditingModal;