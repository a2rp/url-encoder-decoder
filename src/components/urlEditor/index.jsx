import { useEffect, useRef, useState } from "react";
import { FiChevronDown, FiClipboard, FiFileText, FiTrash2 } from "react-icons/fi";
import { maxInputLength } from "../../utils/urlTools.js";
import styles from "./styles.module.css";

const UrlEditor = ({ value, onChange, direction, mode, samples, onRequestSample, onRequestClear, onCopy, copied, message, onMessage }) => {
    const sampleMenuRef = useRef(null);
    const [sampleMenuOpen, setSampleMenuOpen] = useState(false);

    useEffect(() => {
        if (!sampleMenuOpen) return undefined;
        const closeOutside = (event) => {
            if (!sampleMenuRef.current?.contains(event.target)) setSampleMenuOpen(false);
        };
        const closeOnEscape = (event) => {
            if (event.key === "Escape") setSampleMenuOpen(false);
        };
        window.addEventListener("pointerdown", closeOutside);
        window.addEventListener("keydown", closeOnEscape);
        return () => {
            window.removeEventListener("pointerdown", closeOutside);
            window.removeEventListener("keydown", closeOnEscape);
        };
    }, [sampleMenuOpen]);

    const inputLabel = direction === "encode" ? "Text to encode" : "Text to decode";
    const formatTip = mode === "query"
        ? direction === "encode" ? "Use a JSON object or an array of [key, value] pairs." : "Paste a query string, with or without its leading question mark."
        : mode === "address" ? "Address mode keeps URL separators such as /, ?, =, and #." : "Component mode encodes reserved characters as part of one value.";

    return (
        <section className={styles.editor} aria-labelledby="input-title">
            <div className={styles.editorHeading}>
                <div><span className={styles.number}>01</span><div><p>INPUT</p><h3 id="input-title">{inputLabel}</h3></div></div>
                <span className={styles.formatBadge}><FiFileText aria-hidden="true" /> {mode === "component" ? "Component" : mode === "address" ? "Full URL" : "Query string"}</span>
            </div>
            <div className={styles.toolbar}>
                <div className={styles.sampleMenu} ref={sampleMenuRef}>
                    <button className={styles.toolbarButton} type="button" aria-expanded={sampleMenuOpen} aria-haspopup="true" onClick={() => setSampleMenuOpen((open) => !open)}>Examples <FiChevronDown aria-hidden="true" /></button>
                    {sampleMenuOpen && <div className={styles.samplePanel} aria-label="Choose an example">
                        {samples.map((sample) => <button type="button" key={sample.name} onClick={() => { setSampleMenuOpen(false); onRequestSample(sample); }}><strong>{sample.name}</strong><small>{sample.detail}</small></button>)}
                    </div>}
                </div>
                <button className={styles.toolbarButton} type="button" onClick={onCopy} disabled={!value}><FiClipboard aria-hidden="true" /> {copied === "input" ? "Copied" : "Copy input"}</button>
                <button className={styles.clearButton} type="button" onClick={onRequestClear} disabled={!value}><FiTrash2 aria-hidden="true" /> Clear</button>
            </div>
            <label className={styles.inputLabel} htmlFor="url-source">{inputLabel}</label>
            <textarea id="url-source" className={styles.sourceArea} value={value} onChange={(event) => {
                if (event.target.value.length > maxInputLength) {
                    onMessage("Input is limited to 100,000 characters.");
                    return;
                }
                onMessage("");
                onChange(event.target.value);
            }} spellCheck="false" autoCapitalize="off" autoComplete="off" autoCorrect="off" maxLength={maxInputLength} placeholder={direction === "encode" ? "Paste text, an address, or structured query values..." : "Paste encoded text here..."} aria-describedby="url-hint url-message" />
            <div className={styles.editorFooter}>
                <p id="url-hint">{formatTip}</p>
                <span>{value.length.toLocaleString()} / {maxInputLength.toLocaleString()}</span>
            </div>
            <p className={styles.message} id="url-message" role={message ? "alert" : undefined}>{message}</p>
        </section>
    );
};

export default UrlEditor;
