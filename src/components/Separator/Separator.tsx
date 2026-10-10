import styles from "./Separator.module.scss";

interface SeparatorProps {
    horizontal?: boolean,
    length?: string,
    lineWidth?: string,
    color?: string
}

function Separator({ horizontal = false, length = "80%", lineWidth = "2px", color = "#444"}: SeparatorProps) {
    let lengthStyle;
    if (horizontal) {
        lengthStyle = {
            width: length,
            height: lineWidth,
            backgroundColor: color,
            borderColor: color
        };
    } else {
        lengthStyle = {
            width: lineWidth,
            alignSelf: "stretch",
            backgroundColor: color,
            borderColor: color
        };
    }

    return (
        <>
            <div className={styles.separator} style={lengthStyle}></div>
        </>
    );
}

export default Separator;    