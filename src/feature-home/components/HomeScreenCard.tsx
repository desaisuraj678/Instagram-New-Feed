import React, {useEffect, useMemo} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import LikedIcon from '../../resources/icons/liked-icon.svg';
import UnLikedIcon from '../../resources/icons/unlike-icon.svg';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

function HomeScreenCard({
  cardItem,
  toggleLike,
}: {
  cardItem: any;
  toggleLike: (id: number) => void;
}): JSX.Element {
  const scale = useSharedValue(1);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const opacity = useSharedValue(0);
  const likeOnPressHandler = () => {
    toggleLike(cardItem.id); 
  };

  const pinch = useMemo(() => {
    return Gesture.Pinch()
      .onUpdate(e => {
        if (e.scale < 1) {
          scale.value = 1;
        } else {
          scale.value = e.scale;
        }
      })
      .onEnd(() => {
        scale.value = withTiming(1, {
          duration: 300,
        });
      });
  }, []);

  const panGesture = useMemo(() => {
    return Gesture.Pan()
      .onUpdate(e => {
        if (scale.value !== 1) {
          translateX.value = e.translationX;
          translateY.value = e.translationY;
        }
      })
      .onEnd(() => {
        translateX.value = withTiming(0, {
          duration: 300,
        });
        translateY.value = withTiming(0, {
          duration: 300,
        });
      });
  }, []);

  useEffect(() => {
    opacity.value = withTiming(1, {
      duration: 700,
    });
  }, []);

  const composedGesture = Gesture.Simultaneous(pinch, panGesture);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {scale: scale.value},
      {translateX: translateX.value},
      {translateY: translateY.value},
    ],
    opacity: opacity.value,
  }));

  return (
    <View style={styles.wrapper}>
      <View style={styles.topCard}>
        <Image style={styles.avatar} source={{uri: cardItem?.urlToImage}} />
        <Text style={styles.author}>{cardItem?.author}</Text>
      </View>
      <GestureDetector gesture={composedGesture}>
        <Animated.Image
          source={{uri: cardItem?.urlToImage}}
          style={[styles.img, animatedStyle]}
        />
      </GestureDetector>
      <View style={styles.bottomCardWrapper}>
        <TouchableOpacity onPress={likeOnPressHandler}>
          {cardItem?.isLiked ? (
            <LikedIcon height={24} width={24} />
          ) : (
            <UnLikedIcon height={24} width={24} />
          )}
        </TouchableOpacity>
      </View>
      <Text style={styles.likes}>{cardItem?.totalLikes} likes</Text>
    </View>
  );
}

export default React.memo(HomeScreenCard);

const styles = StyleSheet.create({
  wrapper: {flex: 1},
  topCard: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  avatar: {
    height: 33,
    aspectRatio: 1,
    borderRadius: 16.5,
    marginRight: 8,
  },
  author: {fontWeight: '700', fontSize: 12, color: '#000000'},
  img: {width: '100%', height: 430},
  bottomCardWrapper: {
    flexDirection: 'row',
    marginTop: 4,
    paddingHorizontal: 12,
  },
  likes: {
    fontWeight: '700',
    fontSize: 12,
    color: '#000000',
    paddingHorizontal: 12,
    marginTop: 10,
  },
});
