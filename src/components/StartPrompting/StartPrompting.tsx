import styles from "./StartPrompting.module.scss";

function StartPrompting() {
    function openFileButtonHandler() {

    }

    return (
        <div className={styles.startPrompt}>
            <p className={styles.promptText}>
                Hey there! <br/>
                To start, please open a file and change the settings accordingly.
            </p>

            <button className={styles.openFileButton} onClick={openFileButtonHandler}>Open File...</button>
        </div>
    );
}

export default StartPrompting;    