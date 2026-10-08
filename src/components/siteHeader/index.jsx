import { FiArrowUpRight, FiGithub, FiLink } from "react-icons/fi";
import styles from "./styles.module.css";

const SiteHeader = () => (
    <header className={styles.header}>
        <div className={styles.headerInner}>
            <a className={styles.brand} href="#top" aria-label="URL Encoder and Decoder home">
                <span className={styles.brandMark}><FiLink aria-hidden="true" /></span>
                <span><strong>link / decode</strong><small>URL WORKBENCH</small></span>
            </a>
            <nav className={styles.navigation} aria-label="Main navigation">
                <a href="#workbench">Workbench</a>
                <a href="#formats">Formats</a>
            </nav>
            <a className={styles.repositoryLink} href="https://github.com/a2rp/url-encoder-decoder" target="_blank" rel="noreferrer" aria-label="Repository on GitHub, opens in a new tab">
                <FiGithub aria-hidden="true" /><span>Repository</span><FiArrowUpRight aria-hidden="true" className={styles.externalIcon} />
            </a>
        </div>
    </header>
);

export default SiteHeader;
