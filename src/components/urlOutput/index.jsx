import { FiAlertCircle, FiCheck, FiClipboard, FiCode } from "react-icons/fi";
import styles from "./styles.module.css";

const UrlOutput = ({ output, error, direction, mode, copied, onCopy }) => (
    <section className={styles.output} aria-labelledby="output-title">
        <div className={styles.outputHeading}>
            <div><span className={styles.number}>02</span><div><p>RESULT</p><h3 id="output-title">{error ? "Check the input" : direction === "encode" ? "Encoded output" : "Decoded output"}</h3></div></div>
            <span className={`${styles.status} ${error ? styles.error : output ? styles.ready : styles.idle}`}><i />{error ? "Needs attention" : output ? "Updated" : "Waiting"}</span>
        </div>
        <div className={`${styles.outputArea} ${error ? styles.hasError : ""}`}>
            {error ? <div className={styles.errorPanel} role="alert"><span><FiAlertCircle aria-hidden="true" /></span><strong>Could not transform this text</strong><p>{error}</p></div>
                : output ? <textarea readOnly value={output} aria-label="Transformed output" spellCheck="false" />
                    : <div className={styles.emptyOutput}><span><FiCode aria-hidden="true" /></span><strong>Output appears here</strong><p>Change the input or choose an example to see the result.</p></div>}
        </div>
        <div className={styles.outputFooter}>
            <p>{output ? `${output.length.toLocaleString()} characters` : mode === "query" ? "Query pairs preserve order and duplicates" : "Live transformation"}</p>
            <button type="button" onClick={onCopy} disabled={!output || Boolean(error)}>{copied ? <FiCheck aria-hidden="true" /> : <FiClipboard aria-hidden="true" />} {copied ? "Copied" : "Copy output"}</button>
        </div>
    </section>
);

export default UrlOutput;
