export const stylesOpportunity = {
  postContainer: {
    flexDirection: "column",
    borderColor: "gray.200",
    borderWidth: "1px",
    borderStyle: "solid",
    borderRadius: "md",
    w: "320px",
    h: "428px",
    position: "relative",
  },
  sectionContainer: {
    flexDirection: "column",
    w: "100%",
    pr: 1,
  },
  drawer: {
    btnHasApplied: {
      w: "100%",
      bgColor: 'transparent',
      color: 'twitter.500',
      borderWidth: '1px',
      borderStyle: 'solid',
      borderColor: 'twitter.500',
    },
    btnNotApplied: {
      w: "100%",
      bgColor: 'twitter.500',
      color: '#fff',
      borderWidth: '1px',
      borderStyle: 'solid',
      borderColor: 'twitter.500',
      _hover: {
        bgColor: 'twitter.500',
      }
    },
    drawerSpinner: {
      position: "absolute",
      w: "calc(100% - 48px)",
      h: "100vh",
      bgColor: "rgba(255, 255, 255, 0.5)",
      alignItems: "center",
      zIndex: 802,
      justifyContent: "center",
    },
    secTitle: {
      fontSize: "xl",
      fontWeight: "semibold",
      py: 5,
    },
    header: {
      statConainer: {
        alignItems: "center",
        mt: -1,
        gap: 2,
        text: {
          fontSize: "sm",
        },
        icon: {
          color: "green.400",
          boxSize: 2,
        },
      },
      companyName: {
        fontSize: "xl",
        fontWeight: "semibold",
      },
      textContainer: {
        flexDirection: "column",
        gap: 0,
      },
      image: {
        maxW: "60px",
        bgColor: "red",
        borderColor: "gray.300",
        borderWidth: "1px",
        borderStyle: "solid",
        borderRadius: "md",
      },
    },
    details: {
      secContainer: {
        flexDirection: "column",
        flexGrow: 1,
        pt: 2,
        pb: 6,
        borderColor: "gray.300",
        borderBottomWidth: "1px",
        borderStyle: "solid",
      },
      flexContainer: {
        gap: 2,
      },
      label: {
        color: "gray.500",
      },
      data: {
        fontWeight: "semibold",
      },
    },
    brief: {
      secContainer: {
        flexDirection: "column",
        py: 2,
        flexGrow: 1,
        overflowY: "hidden",
      },
      postTitle: {
        fontWeight: "semibold",
        // color: "gray.700",
        fontSize: "lg",
      },
      viewMore: {
        cursor: "default",
        color: "blue.400",
        fontSize: "sm",
        fontWeight: "semibold",
      },
    },
    activities: {
      secContainer: {
        flexDirection: "column",
        py: 2,
        flexGrow: 1,
      },
      tableContainer: {
        width: "100%",
        // maxH: "200px",
        overflowY: "auto",
      },
      rowContainer: {
        flexDirection: "column",
        gap: 2,
      },
      tableData: {
        fontSize: "sm",
        fontWeight: "thin",
        pb: 2,
        gap: 2,
        alignItems: "center",
        borderColor: "gray.300",
        borderBottomWidth: "1px",
        borderStyle: "solid",
      },
    },
    applyGrid: {
      py: "2",
      display: "flex",
      alignItems: "flex-end",
    },
  },
}