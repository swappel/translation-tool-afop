import styles from "./LineTable.module.scss";
import { useEffect, useState } from "react";
import type { LocaleLineData } from "../../types/electron";
import {clsx} from "clsx";

interface LineTableProps {
    pageSize: number;
    onLineSelect: (lineData: LocaleLineData, index: number) => void;
}

function LineTable({ pageSize, onLineSelect }: LineTableProps) {
    const [lines, setLines] = useState<LocaleLineData[]>([]);
    const [page, setPage] = useState<number>(0);
    const [totalLines, setTotalLines] = useState<number>(0);

    const [tempPage, setTempPage] = useState<string>("1");

    useEffect(() => {
        const fetchTotal = async () => {
            const res = await window.api.getTotalLines();
            if (res.success && typeof res.total === "number") {
                setTotalLines(res.total);
            }
        };
        fetchTotal();
    }, []);

    const availableLines = Math.max(0, totalLines - 2);
    const maxPage = Math.max(0, Math.ceil(availableLines / pageSize) - 1);

    useEffect(() => {
        setTempPage(String(page + 1));
    }, [page, pageSize]);

    useEffect(() => {
        setPage(0);
    }, [pageSize]);

    useEffect(() => {
        const fetchChunk = async () => {
            const startIndex = 2 + (page * pageSize);
            const res = await window.api.getLinesRange(startIndex, pageSize);
            if (res.success && res.lines) {
                setLines(res.lines);
            }
        };

        fetchChunk();
    }, [page, pageSize]);

    const commitPageChange = () => {
        const parsed = parseInt(tempPage, 10);
        if (isNaN(parsed)) {
            setTempPage(String(page + 1));
            return;
        }

        const targetPage = Math.max(0, Math.min(maxPage, parsed - 1));
        setPage(targetPage);
        setTempPage(String(targetPage + 1));
    };

    return (
        <div className={styles.lineTableWrapper}>
            <table className={styles.lineTable}>
                <thead className={styles.lineTableHeader}>
                    <tr>
                        <th className={clsx(styles.lineTableHeaderEntry, styles.lineTableIndexHeader)} scope="col">Index</th>
                        <th className={clsx(styles.lineTableHeaderEntry, styles.lineTableHashHeader)} scope="col">Hash</th>
                        <th className={clsx(styles.lineTableHeaderEntry, styles.lineTableContentHeader)} scope="col">Content</th>
                    </tr>
                </thead>
                <tbody>
                {lines.map((line, idx) => {
                    const absoluteIndex = 2 + page * pageSize + idx;
                    const displayIndex = absoluteIndex - 1;

                    return (
                        <tr
                            key={line.hash ? `${line.hash}-${idx}` : idx}
                            onDoubleClick={() => onLineSelect(line, displayIndex)}
                        >
                            <th className={styles.lineTableID} scope="row">
                                {displayIndex}
                            </th>
                            <td>{line.hash}</td>
                            <td className={styles.contentCell}>{line.content}</td>
                        </tr>
                    );
                })}
                </tbody>
            </table>

            <div className={styles.paginationControls}>
                <button
                    className={styles.pageButton}
                    onClick={() => setPage((p) => Math.max(0, p - 1))}
                    disabled={page === 0}
                >
                    Previous
                </button>
                <p>
                    Page{" "}
                    <input
                        className={styles.pageNumberInput}
                        type="number"
                        min={1}
                        max={maxPage + 1}
                        value={tempPage}
                        onChange={(e) => setTempPage(e.target.value)}
                        onBlur={commitPageChange}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                commitPageChange();
                            }
                        }}
                    />{" "}
                    of {maxPage + 1}
                </p>
                <button
                    className={styles.pageButton}
                    onClick={() => setPage((p) => Math.min(maxPage, p + 1))}
                    disabled={page >= maxPage}
                >
                    Next
                </button>
            </div>
        </div>
    );
}

export default LineTable;