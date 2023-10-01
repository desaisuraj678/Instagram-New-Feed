import React, {useCallback, useMemo} from 'react';
import { ActivityIndicator, StyleSheet, View} from 'react-native';
import {useHomeFeed} from '../hooks/useHomeFeed';
import HomeScreenCard from '../components/HomeScreenCard';
import { FlatList } from 'react-native-gesture-handler';

function HomeScreen() {
  const {homeFeedData, callNextBatch,toggleLike,isLoading} = useHomeFeed();

  const renderItemHandler = useCallback(
    ({item}) => {
      return <HomeScreenCard cardItem={item} toggleLike={toggleLike} />;
    },
    [homeFeedData],
  );

  return (
    <View style={{flex:1}}>
        {isLoading&&<ActivityIndicator size="large"/>}
        <FlatList
      data={homeFeedData}
      renderItem={renderItemHandler}
      keyExtractor={(item) => item.id}
      onEndReached={callNextBatch}
      style={styles.flexStyle}
      initialNumToRender={4}
    />
    </View>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
    flexStyle : {flex:1}
})
