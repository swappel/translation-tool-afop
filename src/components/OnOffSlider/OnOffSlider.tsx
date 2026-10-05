import styles from "./OnOffSlider.module.scss";
import { clsx } from "clsx";

interface OnOffSliderProps {
    label: string;
    isEnabled: boolean;
    onClickHandler: () => void;
}

function OnOffSlider({ label, isEnabled, onClickHandler }: OnOffSliderProps) {
    return (
        <div className={styles.sliderContainer}>
            <label className={styles.sliderLabel}>{label}</label>

            <div
                className={styles.sliderOutside}
                onClick={onClickHandler}
            >
                <svg className={styles.sliderSvg}>
                    <circle className={clsx(styles.sliderCircle,
                        {
                            [styles.sliderCircleOn]: isEnabled,
                            [styles.sliderCircleOff]: !isEnabled,
                        }
                        )}
                    />
                </svg>
            </div>
        </div>
    );
}

export default OnOffSlider;