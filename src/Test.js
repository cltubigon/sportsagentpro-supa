/* eslint-disable react-hooks/exhaustive-deps */
import { useRef } from "react";

const Test = () => {
  console.log(" test triggered")
  const containerRef = useRef(null);

  const scrollToTop = () => {
    if (containerRef.current) {
      containerRef.current.scrollTop = 0;
    }
  };

  return (
    <div style={{ paddingTop: '88px' }}>
      <button onClick={scrollToTop}>Scroll to Top</button>
      <div
        ref={containerRef}
        style={{
          height: '200px',
          overflowY: 'scroll',
          border: '1px solid #ccc',
        }}
      >
        {/* Content */}
        {Array.from({ length: 50 }, (_, index) => (
          <p key={index}>Item {index + 1}</p>
        ))}
      </div>
    </div>
  )
}

export default Test