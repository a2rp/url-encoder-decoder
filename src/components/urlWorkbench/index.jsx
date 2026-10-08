import { useCallback, useState } from "react";
import { FiArrowDownLeft, FiArrowUpRight, FiCheck, FiShield } from "react-icons/fi";
import { urlSamples } from "../../data/urlSamples.js";
import { transformUrlText } from "../../utils/urlTools.js";
import ChangeConfirm from "../changeConfirm/index.jsx";
import UrlEditor from "../urlEditor/index.jsx";
import UrlOutput from "../urlOutput/index.jsx";
import styles from "./styles.module.css";

const formatChoices = [
    { id: "component", label: "URL component" },
    { id: "address", label: "Full address" },
    { id: "query", label: "Query pairs" },
];

const UrlWorkbench = () => {
    const [mode, setMode] = useState("component");
    const [direction, setDirection] = useState("encode");
    const [input, setInput] = useState(urlSamples[0].source);
    const [pendingAction, setPendingAction] = useState(null);
    const [inputMessage, setInputMessage] = useState("");
    const [copied, setCopied] = useState("");
    const [notice, setNotice] = useState("");

    const result = transformUrlText(input, direction, mode);

    const copyInput = useCallback(async () => {
        try {
            await navigator.clipboard.writeText(input);
            setCopied("input");
            setNotice("Input copied to clipboard.");
        } catch {
            setNotice("Clipboard access is unavailable in this browser.");
        }
    }, [input]);

    const copyOutput = useCallback(async () => {
        if (!result.ok || !result.output) return;
        try {
            await navigator.clipboard.writeText(result.output);
            setCopied("output");
            setNotice("Output copied to clipboard.");
        } catch {
            setNotice("Clipboard access is unavailable in this browser.");
        }
    }, [result]);

    const requestClear = useCallback(() => setPendingAction({ kind: "clear" }), []);
    const requestSample = useCallback((sample) => setPendingAction({ kind: "sample", sample }), []);
    const cancelAction = useCallback(() => setPendingAction(null), []);
    const confirmAction = useCallback(() => {
        if (pendingAction?.kind === "clear") {
            setInput("");
            setInputMessage("");
            setNotice("");
        } else if (pendingAction?.kind === "sample") {
            setInput(pendingAction.sample.source);
            setMode(pendingAction.sample.mode);
            setDirection(pendingAction.sample.direction);
            setInputMessage("");
            setNotice("");
            setCopied("");
        }
        setPendingAction(null);
    }, [pendingAction]);

    const changeMode = (nextMode) => {
        setMode(nextMode);
        setCopied("");
        setNotice("");
    };

    const changeDirection = (nextDirection) => {
        setDirection(nextDirection);
        setCopied("");
        setNotice("");
    };

    const actionTitle = pendingAction?.kind === "clear" ? "Clear the current input?" : "Load this example?";
    const actionDescription = pendingAction?.kind === "clear"
        ? "This removes the text in the source field and clears the current output."
        : pendingAction ? `This replaces the current text and switches to ${formatChoices.find((choice) => choice.id === pendingAction.sample.mode)?.label.toLowerCase()} ${pendingAction.sample.direction} mode.` : "";

    return (
        <section className={styles.workbench} id="workbench" aria-labelledby="workbench-title">
            <div className={styles.workbenchHeading}>
                <div><p className={styles.sectionLabel}>Tool workspace</p><h2 id="workbench-title">Encode it once. Read it clearly.</h2><span>Choose the URL format, then edit the source to see the result.</span></div>
                <div className={styles.localBadge}><FiShield aria-hidden="true" /> Runs locally</div>
            </div>
            <div className={styles.controlBar}>
                <div className={styles.formatGroup} role="group" aria-label="URL format">
                    {formatChoices.map((choice) => <button type="button" key={choice.id} className={mode === choice.id ? styles.activeFormat : ""} aria-pressed={mode === choice.id} onClick={() => changeMode(choice.id)}>{choice.label}</button>)}
                </div>
                <div className={styles.directionGroup} role="group" aria-label="Transform direction">
                    <button type="button" className={direction === "encode" ? styles.activeDirection : ""} aria-pressed={direction === "encode"} onClick={() => changeDirection("encode")}><FiArrowUpRight aria-hidden="true" /> Encode</button>
                    <button type="button" className={direction === "decode" ? styles.activeDirection : ""} aria-pressed={direction === "decode"} onClick={() => changeDirection("decode")}><FiArrowDownLeft aria-hidden="true" /> Decode</button>
                </div>
            </div>
            <p className={styles.formatDescription}>{mode === "component" ? "Component mode encodes every reserved character as part of one value." : mode === "address" ? "Address mode keeps URL structure such as slashes, query separators, and anchors." : "Query pairs mode uses form encoding, where spaces become plus signs and repeated keys stay in order."}</p>
            <div className={styles.workspaceGrid}>
                <UrlEditor value={input} onChange={(value) => { setInput(value); setCopied(""); setNotice(""); }} direction={direction} mode={mode} samples={urlSamples} onRequestSample={requestSample} onRequestClear={requestClear} onCopy={copyInput} copied={copied} message={inputMessage} onMessage={setInputMessage} />
                <UrlOutput output={result.ok ? result.output : ""} error={result.ok ? "" : result.error} direction={direction} mode={mode} copied={copied === "output"} onCopy={copyOutput} />
            </div>
            <div className={styles.workbenchFoot}><FiCheck aria-hidden="true" /><span>Input and output are processed in this browser. Nothing is saved or uploaded.</span><small>100K limit</small></div>
            {notice && <p className={styles.notice} role="status" aria-live="polite">{notice}</p>}
            {pendingAction && <ChangeConfirm title={actionTitle} description={actionDescription} confirmLabel={pendingAction.kind === "clear" ? "Clear input" : "Load example"} onCancel={cancelAction} onConfirm={confirmAction} />}
        </section>
    );
};

export default UrlWorkbench;
