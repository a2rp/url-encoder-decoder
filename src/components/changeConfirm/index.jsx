import { useEffect, useRef } from "react";
import { FiAlertTriangle } from "react-icons/fi";
import styles from "./styles.module.css";

const ChangeConfirm = ({ title, description, confirmLabel, onCancel, onConfirm }) => {
    const cancelRef = useRef(null);
    const confirmRef = useRef(null);

    useEffect(() => {
        const previousFocus = document.activeElement;
        cancelRef.current?.focus();
        const handleKeyDown = (event) => {
            if (event.key === "Escape") {
                event.preventDefault();
                onCancel();
                return;
            }
            if (event.key === "Tab") {
                if (event.shiftKey && document.activeElement === cancelRef.current) {
                    event.preventDefault();
                    confirmRef.current?.focus();
                } else if (!event.shiftKey && document.activeElement === confirmRef.current) {
                    event.preventDefault();
                    cancelRef.current?.focus();
                }
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            if (previousFocus instanceof HTMLElement) previousFocus.focus();
        };
    }, [onCancel]);

    return (
        <div className={styles.backdrop} onMouseDown={(event) => { if (event.target === event.currentTarget) onCancel(); }}>
            <section className={styles.dialog} role="alertdialog" aria-modal="true" aria-labelledby="change-title" aria-describedby="change-description">
                <span className={styles.warningIcon}><FiAlertTriangle aria-hidden="true" /></span>
                <h2 id="change-title">{title}</h2>
                <p id="change-description">{description}</p>
                <div className={styles.actions}>
                    <button ref={cancelRef} className={styles.cancelButton} type="button" onClick={onCancel}>Keep editing</button>
                    <button ref={confirmRef} className={styles.confirmButton} type="button" onClick={onConfirm}>{confirmLabel}</button>
                </div>
            </section>
        </div>
    );
};

export default ChangeConfirm;
