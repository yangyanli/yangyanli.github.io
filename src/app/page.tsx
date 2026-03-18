import Image from "next/image";
import DomainChart from "./DomainChart";
import ThemeToggle from "./components/ThemeToggle";
import ProtectedEmail from "./components/ProtectedEmail";
import ProtectedWeChat from "./components/ProtectedWeChat";

export default function Home() {
  return (
    <>
      <main>
        {/* Hero / About Section */}
        <section className="hero container" style={{ position: 'relative' }}>
          <div style={{ position: 'absolute', top: '2rem', right: '1.5rem', zIndex: 10 }}>
            <ThemeToggle />
          </div>
          <div className="hero-grid">
            <div className="portrait-wrapper fade-in">
              <div className="portrait-glow" />
              <Image
                src="/portrait.jpg"
                alt="Yangyan Li"
                className="portrait"
                width={200}
                height={200}
                priority
              />
            </div>

            <div className="hero-info">
              <h1 className="fade-in">
                Yangyan Li <span style={{ fontWeight: 400, fontSize: '0.7em' }}>(李扬彦)</span>
              </h1>
              <p className="subtitle fade-in fade-in-delay-1">
                Senior Researcher · <a href="https://www.antresearch.com/" target="_blank" rel="noopener noreferrer">Ant Group Research Institute</a>
              </p>
              
              <div className="social-links fade-in fade-in-delay-1">
                <a
                  href="https://scholar.google.com/citations?user=9RxI7UAAAAAJ&hl=en"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                  title="Google Scholar"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M5.242 13.769L0 9.5 12 0l12 9.5-5.242 4.269C17.548 11.249 14.978 9.5 12 9.5c-2.977 0-5.548 1.748-6.758 4.269zM12 10a7 7 0 1 0 0 14 7 7 0 0 0 0-14z" />
                  </svg>
                  Scholar
                </a>
                <a
                  href="https://github.com/yangyanli"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                  title="GitHub"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                  GitHub
                </a>
                <a
                  href="https://x.com/yangyanli"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                  title="X (Twitter)"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                  X
                </a>
                <ProtectedWeChat />
                <ProtectedEmail />
              </div>
              <div className="bio fade-in fade-in-delay-2">
                <p>
                  Previously a professor at Shandong University and Staff Algorithm Engineer at
                  Alibaba Group. I was a postdoctoral fellow at Stanford University with Prof.{" "}
                  <a href="https://en.wikipedia.org/wiki/Leonidas_J._Guibas" target="_blank" rel="noopener noreferrer">
                    Leonidas J. Guibas
                  </a>{" "}
                  and at Tel Aviv University with Prof.{" "}
                  <a href="https://danielcohenor.com/" target="_blank" rel="noopener noreferrer">
                    Daniel Cohen-Or
                  </a>
                  . PhD from University of Chinese Academy of Sciences (advisor: Prof.{" "}
                  <a href="https://baoquanchen.info/" target="_blank" rel="noopener noreferrer">
                    Baoquan Chen
                  </a>
                  ), B.S. from Sichuan University.
                </p>
              </div>

              <div className="research-card fade-in fade-in-delay-3">
                <h2 className="research-heading">Research Interests</h2>
                <p>
                  Mostly into 3D vision, especially deep learning on point clouds
                  (<a href="https://github.com/yangyanli/PointCNN" target="_blank" rel="noopener noreferrer">PointCNN</a>,{" "}
                  <a href="https://github.com/ant-research/pointelligence" target="_blank" rel="noopener noreferrer">PointCNN++</a>),
                  and even some{" "}
                  <a href="https://arxiv.org/abs/2508.13246" target="_blank" rel="noopener noreferrer">jailbreak attempts</a>.
                  Somewhere in all of this, I dream of minds — silicon or otherwise — that
                  wander through rooms they&#39;ve never seen, reach for objects they&#39;ve never held,
                  and find their way home through streets that only exist in points and pixels.
                </p>
              </div>

              <div className="research-content fade-in fade-in-delay-4">
                <p>
                  My work is, in some unsuspecting corners of academia, to be compared
                  against sometimes, to be discussed often, to be forgotten always — as the{" "}
                  <a href="https://github.com/yangyanli/citation_analyzer" target="_blank" rel="noopener noreferrer">
                    fully AI generated
                  </a>{" "}
                  chart below rigorously proves.
                </p>
              </div>



            </div>
          </div>
        </section>

        {/* Domain Distribution Chart */}
        <DomainChart />
      </main>

      {/* Footer */}
      <footer className="footer container">
        <p className="footer-text">
          © {new Date().getFullYear()} Yangyan Li
        </p>
      </footer>
    </>
  );
}

