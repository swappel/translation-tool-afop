import styles from "./SearchBar.module.scss";

interface SearchBarProps {
    onPageSizeChange: (size: number) => void,
    pageSize: number,
    onSaveClick: () => void;
}

function SearchBar({ onPageSizeChange, pageSize, onSaveClick }: SearchBarProps) {
    return (
        <div className={styles.searchBarContainer}>
            <div className={styles.leftSection}>
                <input
                    className={styles.searchBar}
                    type={"text"}
                    placeholder={"Search lines here"}
                    spellCheck={"false"}
                />

                <input
                    className={styles.pageSizeInput}
                    type="number"
                    value={pageSize}
                    onChange={(e) => onPageSizeChange(Number(e.target.value))}
                />

                <button>More settings...</button>
            </div>

            <p className={styles.pageTitle}>A:FoP Localizer</p>

            <div className={styles.rightSection}>
                <button>Show Changes</button>
                <button>Load file</button>
                <button onClick={onSaveClick}>Save changes</button>
            </div>
        </div>
    );
}

export default SearchBar;    