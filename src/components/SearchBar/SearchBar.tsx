import styles from "./SearchBar.module.scss";
import OnOffSlider from "../OnOffSlider/OnOffSlider.tsx";
import {useState} from "react";

function SearchBar() {
    return (
        <div className={styles.searchBarContainer}>
            <div className={styles.leftSection}>
                <input
                    className={styles.searchBar}
                    type={"text"}
                    placeholder={"Search lines here"}
                    spellCheck={"false"}
                />

                <button>More settings...</button>
            </div>

            <p className={styles.pageTitle}>A:FoP Localizer</p>

            <div className={styles.rightSection}>
                <button>Show Changes</button>
                <button>Load file</button>
                <button>Save changes</button>
                <button>Export files</button>
            </div>
        </div>
    );
}

export default SearchBar;    