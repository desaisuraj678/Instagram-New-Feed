import {useCallback, useEffect, useRef, useState} from 'react';
import {getNewFeed} from '../apis/api';
import {getRandomInt, getUniqueId} from '../../core-utils/helper';
import { newFeedResArticleItemType } from '../types/types';

export function useHomeFeed() {
  const [homeFeedData, setHomeFeedData] = useState<Array<any>>([]);
  const [isLoading,setIsLoading] = useState(true)
  const pageNumber = useRef(0);
  const isLocked = useRef(false);
  const pageSize = 10;

  const callAndUpdateHomeFeed = useCallback(async () => {
    getNewFeed(pageNumber.current, pageSize)
      .then(res => {
        isLocked.current = false;
        setIsLoading(false)
        if (res && Array.isArray(res?.articles)) {
          setHomeFeedData(prevData => {
            let modifiedData = res.articles.map((item:newFeedResArticleItemType) => {
              return {
                ...item,
                isLiked: false,
                totalLikes: getRandomInt(1000),
                id: getUniqueId(),
              };
            });
            return [...prevData, ...modifiedData];
          });
        }
      })
      .catch(err => {
        setIsLoading(false)
        isLocked.current = false;
        pageNumber.current--;
      });
  }, [homeFeedData]);

  const callNextBatch = useCallback(() => {
    if (!isLocked.current) {
      isLocked.current = true;
      pageNumber.current++;
      callAndUpdateHomeFeed();
    }
  }, []);

  const toggleLike = useCallback(
    (id: number) => {
      setHomeFeedData(prevData => {
        let modifiedData = prevData.map(item => {
          if (id == item.id) {
            return {
              ...item,
              isLiked: !item.isLiked,
              totalLikes : !item.isLiked ? item.totalLikes + 1 : item.totalLikes - 1
            };
          }
          return item;
        });
        return [...modifiedData];
      });
    },
    [homeFeedData],
  );

  useEffect(() => {
    callAndUpdateHomeFeed();
  }, []);

  return {
    homeFeedData,
    callNextBatch,
    toggleLike,
    isLoading
  };
}
