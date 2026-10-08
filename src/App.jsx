import { FiArrowRight, FiCode, FiGlobe, FiLink, FiShield } from "react-icons/fi";
import UrlWorkbench from "./components/urlWorkbench/index.jsx";
import SiteHeader from "./components/siteHeader/index.jsx";
import SiteFooter from "./components/siteFooter/index.jsx";
import BackToTop from "./components/backToTop/index.jsx";
import styles from "./App.module.css";

const App = () => (
    <div className={styles.appShell} id="top">
        <SiteHeader />
        <main>
            <section className={styles.hero} aria-labelledby="hero-title">
                <div className={styles.heroInner}>
                    <div className={styles.heroCopy}>
                        <p className={styles.heroLabel}><FiLink aria-hidden="true" /> URL text workbench</p>
                        <h1 id="hero-title">Encode what matters.<br /><span>Keep the structure.</span></h1>
                        <p className={styles.heroDescription}>Choose a single value, a complete address, or query pairs. See the transformed text as you type and keep separators intact when they carry meaning.</p>
                        <a className={styles.heroLink} href="#workbench">Open the workbench <FiArrowRight aria-hidden="true" /></a>
                        <p className={styles.privacyNote}><FiShield aria-hidden="true" /> Nothing leaves this page.</p>
                    </div>
                    <div className={styles.protocolCard} role="img" aria-label="Example URL showing encoded spaces and retained URL separators">
                        <div className={styles.protocolHeader}><span className={styles.windowDots}><i /><i /><i /></span><span><FiGlobe aria-hidden="true" /> request preview</span><b>GET</b></div>
                        <div className={styles.requestRow}><span>URL</span><code>https://api.example.dev/search?q=sea%20glass<span>&amp;page=2</span></code></div>
                        <div className={styles.ruleRow}><span><i /> slash stays structural</span><span><i /> space becomes %20</span></div>
                        <div className={styles.protocolFooter}><FiCode aria-hidden="true" /><span>COMPONENT</span><span>ADDRESS</span><span>QUERY</span></div>
                    </div>
                </div>
                <div className={styles.heroRail}><span>ONE VALUE</span><i /><span>FULL ADDRESS</span><i /><span>FORM QUERY</span></div>
            </section>
            <UrlWorkbench />
            <section className={styles.formats} id="formats" aria-labelledby="formats-title">
                <div className={styles.formatsHeading}><p>Pick the right format</p><h2 id="formats-title">Small differences matter.</h2><span>Encoding a whole address is not the same as encoding one value inside it.</span></div>
                <div className={styles.formatCards}>
                    <article><span><FiCode aria-hidden="true" /></span><div><h3>URL component</h3><p>Use this for text that will be inserted as a single query value or path segment. Reserved characters are encoded.</p><code>sea glass → sea%20glass</code></div></article>
                    <article><span><FiGlobe aria-hidden="true" /></span><div><h3>Full address</h3><p>Use this for a complete address. Slashes, query separators, and anchors remain in place.</p><code>/search?q=tea → /search?q=tea</code></div></article>
                    <article><span><FiShield aria-hidden="true" /></span><div><h3>Query pairs</h3><p>Build pairs from JSON or decode form data. Spaces use plus signs, and repeated keys keep their order.</p><code>tag=blue+sky&amp;tag=green</code></div></article>
                </div>
            </section>
        </main>
        <SiteFooter />
        <BackToTop />
    </div>
);

export default App;
