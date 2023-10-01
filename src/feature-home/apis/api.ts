import { NEWS_FEED_API_ENDPOINT, NEWS_FEED_API_KEY } from '../../../env/env';

export async function getNewFeed(pageNumber: Number, pageSize: Number) {
  return fetch(
    `${NEWS_FEED_API_ENDPOINT}?pageSize=${pageSize}&page${pageNumber}&sources=bbc-news&apiKey=${NEWS_FEED_API_KEY}`,
  )
    .then(res => {
      return res.json();
    })
    .then(res => {
      return res;
    })
    .catch(err => {
      return err;
    });
}
