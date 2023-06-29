export const preloaderStyle = {
  initial: {
    rotate: 0,
    y: "0",
  },
  rotate: {
    rotate: 360,
    transition: {
      duration: 1.5,
      repeat: "Infinity",
      repeatType: "loop",
      repeatDelay: 0,
    },
  },
  spa: {
    fontSize: "6xl",
    color: "#2A4365",
  },
  mainContainer: {
    pt: "88px",
    gap: 2,
    alignItems: "center",
    justifyContent: "center",
    h: "calc(100vh - 88px)",
    w: "100%",
  },
  ballContainer: {
    alignItems: "flex-start",
    mt: -4,
  },
}
