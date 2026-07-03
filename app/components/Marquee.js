/**
 * Marquee — pure CSS infinite horizontal scroller.
 * Renders items duplicated so the loop is seamless.
 *
 * Props:
 *   items    {string[]}  Text strings to scroll
 *   reverse  {boolean}   Scroll right-to-left (default false = left)
 *   dark     {boolean}   Dark navy background (default true)
 *   speed    {number}    Animation duration in seconds (default 28)
 */
export default function Marquee({ items = [], reverse = false, dark = true, speed = 28 }) {
  const all = [...items, ...items, ...items]; // triple for seamless gap fill

  return (
    <div
      className={`marqueeOuter${dark ? ' marqueeDark' : ' marqueeLight'}`}
      aria-hidden="true"
    >
      <div
        className={`marqueeTrack${reverse ? ' marqueeReverse' : ''}`}
        style={{ animationDuration: `${speed}s` }}
      >
        {all.map((item, i) => (
          <span key={i} className="marqueeItem">
            <span className="marqueeText">{item}</span>
            <span className="marqueeSep">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
