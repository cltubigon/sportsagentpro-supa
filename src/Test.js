import { useState, useEffect } from "react";
import { db } from "./config/fbConfig";
import { Button, Flex, Text } from "@chakra-ui/react";
import SkeletonAthleteOppLoader from "./components/Skeleton/SkeletonAthleteOppLoader";
import { applyToPost } from "./store/actions/postActions";
import { useDispatch, useSelector } from "react-redux";

const InfiniteScrollList = () => {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.auth.profile);
  const email = useSelector((state) => state.auth.email);
  const [items, setItems] = useState([]);
  const [lastVisible, setLastVisible] = useState(null);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);

  const collectionRef = db.collection('posts');

  const fetchNextItems = async () => {
    if (!lastVisible) return;

    const query = collectionRef
      .where("postType", "==", "opportunity")
      .orderBy("createdAt", "desc")
      .startAfter(lastVisible)
      .limit(10);

    try {
      const snapshot = await query.get();

      if (snapshot.empty) {
        setHasMore(false);
        return;
      }

      const newItems = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setLastVisible(snapshot.docs[snapshot.docs.length - 1]);

      // Combine the new items with the existing items using a merge function
      setItems((prevItems) => mergeArrays(prevItems, newItems));
    } catch (error) {
      console.error("Error fetching next items:", error);
    }
  };

  // Function to merge two arrays of objects based on a unique key (id)
  const mergeArrays = (arr1, arr2) => {
    const mergedMap = new Map(arr1.map((item) => [item.id, item]));
    for (const item of arr2) {
      mergedMap.set(item.id, item);
    }
    return Array.from(mergedMap.values());
  };

  useEffect(() => {
    const initialQuery = collectionRef
      .where("postType", "==", "opportunity")
      .orderBy("createdAt", "desc")
      .limit(10);

    const unsubscribe = initialQuery.onSnapshot((snapshot) => {
      if (snapshot.empty) {
        setLoading(false);
        setHasMore(false);
        return;
      }

      const newItems = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setItems(newItems);
      setLastVisible(snapshot.docs[snapshot.docs.length - 1]);
      setLoading(false);
    });

    return () => {
      // Cleanup the initial listener
      unsubscribe();
    };

  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 100
      ) {
        if (!loading && hasMore) {
          fetchNextItems();
        }
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, hasMore]);

  const handleApply = (id, event) => {
    event.stopPropagation();
    dispatch(applyToPost(id, email));
  };

  return (
    <Flex pt={"88px"}>
      <Flex flexWrap={"wrap"} gap={6}>
        {items.map((opp) => {
          const hasApplied = opp.postApplicants && opp.postApplicants.some((applicantEmail) => {
            return profile && email === applicantEmail;
          });

          return (
            <Flex
              key={opp.id}
              flexDirection={'column'}
              w={"250px"}
              h={"400px"}
              border={"1px solid #000"}
              borderRadius={"md"}
            >
              <Text>{opp.postTitle}</Text>
              <Button
                w={"100%"}
                borderWidth="1px"
                borderStyle="solid"
                borderRadius="sm"
                onClick={(event) => handleApply(opp.id, event)}
              >
                {hasApplied ? "Withdraw" : "Apply"}
              </Button>
            </Flex>
          );
        })}
        <SkeletonAthleteOppLoader />
      </Flex>
      {loading && <Text>Loading...</Text>}
      {!loading && !hasMore && <Text>No more items to load.</Text>}
    </Flex>
  );
};

export default InfiniteScrollList;
