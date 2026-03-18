"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import domainData from "../data/domains.json";

const DOMAIN_COLORS = [
  "#818cf8", "#34d399", "#f472b6", "#fbbf24", "#60a5fa",
  "#a78bfa", "#fb923c", "#2dd4bf", "#f87171", "#c084fc",
  "#4ade80", "#38bdf8", "#e879f9", "#facc15", "#fb7185",
  "#67e8f9", "#a3e635", "#f9a8d4", "#86efac", "#fca5a1",
];

const SCORE_COLORS: Record<number, string> = {
  0: "#dc2626", 1: "#ef4444", 2: "#f97316", 3: "#fb923c",
  4: "#f59e0b", 5: "#eab308", 6: "#a3e635", 7: "#22d3ee",
  8: "#34d399", 9: "#10b981", 10: "#059669",
};

const SCORE_LABELS: Record<number, string> = {
  0: "Strongly Negative", 1: "Very Negative", 2: "Negative",
  3: "Somewhat Negative", 4: "Slightly Negative", 5: "Neutral",
  6: "Slightly Positive", 7: "Positive", 8: "Very Positive",
  9: "Highly Positive", 10: "Exceptionally Positive",
};

function polarToCartesian(cx: number, cy: number, r: number, angleDeg: number) {
  const rad = (angleDeg * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

function describeArc(cx: number, cy: number, r: number, startAngle: number, endAngle: number) {
  // Handle full circle (single segment covering 100%) — SVG arc can't draw 360°
  const sweep = Math.abs(endAngle - startAngle);
  if (sweep >= 359.99) {
    return `M ${cx - r} ${cy} A ${r} ${r} 0 1 1 ${cx + r} ${cy} A ${r} ${r} 0 1 1 ${cx - r} ${cy} Z`;
  }
  const start = polarToCartesian(cx, cy, r, endAngle);
  const end = polarToCartesian(cx, cy, r, startAngle);
  const largeArcFlag = sweep > 180 ? 1 : 0;
  return `M ${cx} ${cy} L ${start.x} ${start.y} A ${r} ${r} 0 ${largeArcFlag} 0 ${end.x} ${end.y} Z`;
}

interface Segment {
  startAngle: number;
  endAngle: number;
  percentage: number;
}

function buildSegments<T extends { count: number }>(data: T[], total: number): (T & Segment)[] {
  const segments: (T & Segment)[] = [];
  let currentAngle = -90;
  data.forEach((d) => {
    const percentage = total > 0 ? (d.count / total) * 100 : 0;
    const angle = total > 0 ? (d.count / total) * 360 : 0;
    segments.push({ ...d, startAngle: currentAngle, endAngle: currentAngle + angle, percentage });
    currentAngle += angle;
  });
  return segments;
}

function DomainLegendItem({ d, selectedDomain, toggleDomain, setLegendHoveredDomain }: {
  d: { domain: string, count: number, color: string },
  selectedDomain: string | null,
  toggleDomain: (domain: string) => void,
  setLegendHoveredDomain: (domain: string | null) => void
}) {
  const textRef = useRef<HTMLSpanElement>(null);
  const [isTruncated, setIsTruncated] = useState(false);

  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (textRef.current) {
      setIsTruncated(textRef.current.scrollWidth > textRef.current.clientWidth);
    }
  }, [d.domain]);

  return (
    <button
      onClick={() => toggleDomain(d.domain)}
      onMouseEnter={() => { 
        if (!selectedDomain) setLegendHoveredDomain(d.domain); 
        setIsHovered(true);
      }}
      onMouseLeave={() => {
        setLegendHoveredDomain(null);
        setIsHovered(false);
      }}
      className={`domain-legend-btn ${
        selectedDomain === d.domain ? "selected" : ""
      } ${selectedDomain && selectedDomain !== d.domain ? "dimmed" : ""}`}
      style={{ position: "relative" }}
    >
      <span className="domain-dot" style={{ backgroundColor: d.color }} />
      <span ref={textRef} className="domain-legend-label">{d.domain}</span>
      <span className="domain-legend-count">{d.count}</span>

      {isTruncated && isHovered && (
        <div style={{
          position: "absolute",
          bottom: "100%",
          left: "50%",
          transform: "translateX(-50%)",
          marginBottom: "6px",
          padding: "4px 8px",
          backgroundColor: "#1e293b",
          color: "#fff",
          fontSize: "11px",
          borderRadius: "4px",
          whiteSpace: "nowrap",
          pointerEvents: "none",
          zIndex: 100,
          boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
        }}>
          {d.domain}
          <div style={{
            position: "absolute",
            top: "100%",
            left: "50%",
            transform: "translateX(-50%)",
            borderWidth: "4px",
            borderStyle: "solid",
            borderColor: "#1e293b transparent transparent transparent"
          }} />
        </div>
      )}
    </button>
  );
}

export default function DomainChart() {
  const [hoveredDomain, setHoveredDomain] = useState<string | null>(null);
  const [legendHoveredDomain, setLegendHoveredDomain] = useState<string | null>(null);
  const [selectedDomain, setSelectedDomain] = useState<string | null>(null);
  const [hoveredScore, setHoveredScore] = useState<number | null>(null);

  const entries = useMemo(
    () => domainData.domains.map((d, i) => ({ ...d, color: DOMAIN_COLORS[i % DOMAIN_COLORS.length] })),
    []
  );

  const domainTotal = useMemo(() => entries.reduce((s, d) => s + d.count, 0), [entries]);
  const domainSegments = useMemo(() => buildSegments(entries, domainTotal), [entries, domainTotal]);

  // Sentiment drill-down for the active domain
  const activeDomain = selectedDomain || legendHoveredDomain;

  // Clear stale sentiment hover when switching domains
  useEffect(() => { setHoveredScore(null); }, [activeDomain]);
  const sentimentData = useMemo(() => {
    if (!activeDomain) return [];
    const entry = entries.find((e) => e.domain === activeDomain);
    if (!entry?.sentiment) return [];
    return [...entry.sentiment].sort((a, b) => b.score - a.score);
  }, [entries, activeDomain]);

  const sentimentTotal = useMemo(() => sentimentData.reduce((s, d) => s + d.count, 0), [sentimentData]);

  // Counter-clockwise segments for sentiment pie
  const sentimentSegments = useMemo(() => {
    const segments: { score: number; count: number; startAngle: number; endAngle: number; percentage: number }[] = [];
    let currentAngle = -90;
    sentimentData.forEach((d) => {
      const percentage = sentimentTotal > 0 ? (d.count / sentimentTotal) * 100 : 0;
      const angle = sentimentTotal > 0 ? (d.count / sentimentTotal) * 360 : 0;
      segments.push({ ...d, startAngle: currentAngle - angle, endAngle: currentAngle, percentage });
      currentAngle -= angle;
    });
    return segments;
  }, [sentimentData, sentimentTotal]);

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted || entries.length === 0) return null;

  const showSentiment = !!activeDomain && sentimentData.length > 0;

  const toggleDomain = (domain: string) =>
    setSelectedDomain((prev) => (prev === domain ? null : domain));

  return (
    <section className="domain-section container" id="domains">
      {/* Header */}
      <div className="domain-header">
        <div className="domain-header-left">
          <h2 className="research-heading" style={{ marginBottom: 0 }}>
            The Unsuspecting Corners
          </h2>
          <span className="domain-badge">{entries.length} domains</span>
        </div>
      </div>

      {/* Main content: Pie + Legend */}
      <div className="domain-pie-layout">
        {/* Pie chart + color bar column */}
        <div className="domain-pie-column">
          <div className={`domain-pie-label ${showSentiment ? "visible" : ""}`}>
            How They Cite
          </div>
          <div className="domain-pie-wrap">
            <svg
              viewBox="0 0 200 200"
              className="domain-pie-svg"
              style={{ filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.3))" }}
            >
              {showSentiment
                ? sentimentSegments.map((seg, i) => {
                    const isHovered = hoveredScore === seg.score;
                    const scale = isHovered ? "scale(1.04)" : "scale(1)";
                    return (
                      <path
                        key={seg.score}
                        d={describeArc(100, 100, 85, seg.startAngle, seg.endAngle)}
                        fill={SCORE_COLORS[seg.score] || "#64748b"}
                        stroke="none"
                        opacity={isHovered ? 1 : 0.85}
                        style={{
                          transition: "all 0.2s ease",
                          transform: scale,
                          transformOrigin: "100px 100px",
                          cursor: "default",
                          animation: `sentimentFadeIn 0.35s ease-out ${i * 0.07}s both`,
                        }}
                        onMouseEnter={() => setHoveredScore(seg.score)}
                        onMouseLeave={() => setHoveredScore(null)}
                      />
                    );
                  })
                : domainSegments.map((seg) => {
                    const isHovered = hoveredDomain === seg.domain;
                    const isSelected = selectedDomain === seg.domain;
                    const scale = isHovered || isSelected ? "scale(1.04)" : "scale(1)";
                    return (
                      <path
                        key={seg.domain}
                        d={describeArc(100, 100, 85, seg.startAngle, seg.endAngle)}
                        fill={seg.color}
                        stroke="none"
                        opacity={
                          selectedDomain && selectedDomain !== seg.domain
                            ? 0.3
                            : isHovered
                            ? 1
                            : 0.85
                        }
                        style={{
                          transition: "all 0.2s ease",
                          transform: scale,
                          transformOrigin: "100px 100px",
                          cursor: "pointer",
                        }}
                        onMouseEnter={() => setHoveredDomain(seg.domain)}
                        onMouseLeave={() => setHoveredDomain(null)}
                        onClick={() => toggleDomain(seg.domain)}
                      />
                    );
                  })}

            </svg>

            {/* Hover tooltip — domain view */}
            {!showSentiment &&
              hoveredDomain &&
              (() => {
                const seg = domainSegments.find((s) => s.domain === hoveredDomain);
                if (!seg) return null;
                return (
                  <div className="domain-tooltip">
                    <span className="domain-tooltip-name">{seg.domain}</span>
                    <span className="domain-tooltip-val">
                      {seg.count} ({seg.percentage.toFixed(1)}%)
                    </span>
                  </div>
                );
              })()}

            {/* Hover tooltip — sentiment view */}
            {showSentiment &&
              hoveredScore !== null &&
              (() => {
                const seg = sentimentSegments.find((s) => s.score === hoveredScore);
                if (!seg) return null;
                return (
                  <div className="domain-tooltip">
                    <span className="domain-tooltip-name">{seg.score}/10</span>
                    <span className="domain-tooltip-val" style={{ marginLeft: "0.4rem", color: "var(--text-muted)" }}>
                      {SCORE_LABELS[seg.score]}
                    </span>
                    <span className="domain-tooltip-val">
                      {seg.count} ({seg.percentage.toFixed(1)}%)
                    </span>
                  </div>
                );
              })()}
          </div>

          {/* Sentiment color scale bar */}
          <div className={`domain-colorbar ${showSentiment ? "visible" : ""}`}>
            <div className="domain-colorbar-track">
              {Array.from({ length: 11 }, (_, idx) => {
                const score = 10 - idx;
                const hasData = showSentiment && sentimentData.some((d) => d.score === score);
                const isHovered = hoveredScore === score;
                return (
                  <div
                    key={score}
                    className="domain-colorbar-segment"
                    style={{
                      height: "12px",
                      backgroundColor: SCORE_COLORS[score],
                      opacity: hoveredScore !== null ? (isHovered ? 1 : 0.3) : hasData ? 0.9 : 0.25,
                      ...(showSentiment
                        ? { animation: `segmentReveal 0.35s ease-out ${idx * (sentimentData.length * 0.07 / 11)}s both` }
                        : {}),
                    }}
                    onMouseEnter={() => showSentiment && hasData && setHoveredScore(score)}
                    onMouseLeave={() => setHoveredScore(null)}
                    title={`${score}/10 ${SCORE_LABELS[score]}`}
                  />
                );
              })}
            </div>
            <div className="domain-colorbar-labels">
              <span>Praise</span>
              <span>Critical</span>
            </div>
          </div>
        </div>

        {/* Legend — always shows domains */}
        <div className="domain-legend">
          {entries.map((d) => (
            <DomainLegendItem
              key={d.domain}
              d={d}
              selectedDomain={selectedDomain}
              toggleDomain={toggleDomain}
              setLegendHoveredDomain={setLegendHoveredDomain}
            />
          ))}
        </div>
      </div>

      {/* Footer: data collection date + powered-by link */}
      <div className="domain-footer">
        <span className="domain-footer-date">
          Data collected {domainData.collected}
        </span>
        <a
          href="https://github.com/yangyanli/citation_analyzer"
          target="_blank"
          rel="noopener noreferrer"
          className="domain-footer-link"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
          </svg>
          Powered by Citation Analyzer
        </a>
      </div>


    </section>
  );
}
