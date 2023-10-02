export type newFeedResType = {
    articles : Array<newFeedResArticleItemType>
}

export type newFeedResArticleItemType = {
    isLiked: boolean,
    totalLikes: number,
    id: number,
    urlToImage : string,
    author : string
}