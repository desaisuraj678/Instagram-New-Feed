import React, {useCallback, useContext, useMemo, useRef} from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  View,
} from 'react-native';
import {useHomeFeed} from '../hooks/useHomeFeed';
import HomeScreenCard from '../components/HomeScreenCard';
import {FlatList} from 'react-native-gesture-handler';
import SecondaryButton from '../../core-ui/buttons/SecondaryButton';
import { AppContext } from '../../global-state/AppContext';
import { Colors } from '../../core-ui/theme/Colors';
import { newFeedResArticleItemType } from '../types/types';

function HomeScreen() {
  const {logout} = useContext(AppContext)
  const {homeFeedData, callNextBatch, toggleLike, isLoading} = useHomeFeed();

  const renderItemHandler = useCallback(
    ({item}:{item:newFeedResArticleItemType}) => {
      return <HomeScreenCard cardItem={item} toggleLike={toggleLike} />;
    },
    [homeFeedData],
  );

  const onLogoutPressed = () => {
    logout()
  };

  if (isLoading) {
    return <ActivityIndicator size="large" />;
  }

  return (
    <View style={{flex: 1}}>
      <View style={styles.headerWrapper}>
        <SecondaryButton label="logout" onPressHandler={onLogoutPressed} />
      </View>

      <FlatList
        data={homeFeedData}
        renderItem={renderItemHandler}
        keyExtractor={item => String(item.id)}
        onEndReached={callNextBatch}
        style={styles.flexStyle}
        initialNumToRender={4}
      />
    </View>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  flexStyle: {flex: 1},
  headerWrapper:{
    padding:16,
    flexDirection:'row',
    justifyContent:'flex-end',
    backgroundColor: Colors.color_FAFAFA
  }
});
