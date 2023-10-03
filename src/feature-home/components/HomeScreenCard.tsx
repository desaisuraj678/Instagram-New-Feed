import React, {useEffect, useMemo, useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import LikedIcon from '../../resources/icons/liked-icon.svg';
import UnLikedIcon from '../../resources/icons/unlike-icon.svg';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import Animated, {
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSequence,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import {Colors} from '../../core-ui/theme/Colors';
import {newFeedResArticleItemType} from '../types/types';

function HomeScreenCard({
  cardItem,
  toggleLike,
}: {
  cardItem: newFeedResArticleItemType;
  toggleLike: (id: number) => void;
}): JSX.Element {
  const scale = useSharedValue(1);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const opacity = useSharedValue(0);
  const tapSharedValue = useSharedValue(0);
  const [isActive, setIsActive] = useState(false);
  const likeOnPressHandler = () => {
    toggleLike(cardItem.id);
  };

  function setActive() {
    setIsActive(true);
  }

  function setInactive() {
    setIsActive(false);
  }

  const pinch = useMemo(() => {
    return Gesture.Pinch()
      .onUpdate(e => {
        if (e.scale < 1) {
          scale.value = 1;
        } else {
          scale.value = e.scale;
          runOnJS(setActive)();
        }
      })
      .onEnd(() => {
        runOnJS(setInactive)();
        scale.value = withTiming(1, {
          duration: 300,
        });
      });
  }, []);

  const doubleTap = useMemo(() => {
    return Gesture.Tap()
      .numberOfTaps(2)
      .onStart(() => {
        tapSharedValue.value = withSequence(
          withTiming(1, {duration: 700}),
          withDelay(400, withTiming(0, {duration: 700})),
        );
        runOnJS(likeOnPressHandler)();
      });
  }, []);

  // const panGesture = useMemo(() => {
  //   return Gesture.Pan()
  //     .onUpdate(e => {
  //       if (scale.value !== 1) {
  //         translateX.value = e.translationX;
  //         translateY.value = e.translationY;
  //       }
  //     })
  //     .onEnd(() => {
  //       translateX.value = withTiming(0, {
  //         duration: 300,
  //       });
  //       translateY.value = withTiming(0, {
  //         duration: 300,
  //       });
  //     });
  // }, []);

  useEffect(() => {
    opacity.value = withTiming(1, {
      duration: 700,
    });
  }, []);

  const composedGesture = Gesture.Race(pinch, doubleTap);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {scale: scale.value},
      {translateX: translateX.value},
      {translateY: translateY.value},
    ],
    opacity: opacity.value,
  }));

  const animatedLikedStyle = useAnimatedStyle(() => ({
    transform: [
      {scale: interpolate(tapSharedValue.value, [0, 0.8, 1], [0, 1, 0.8])},
    ],
    opacity: interpolate(tapSharedValue.value, [0, 1], [0, 1]),
  }));

  return (
    <View style={[styles.wrapper, {zIndex: isActive ? 10 : 0}]}>
      <View style={styles.topCard}>
        <Image style={styles.avatar} source={{uri: cardItem?.urlToImage}} />
        <Text style={styles.author}>{cardItem?.author || 'author'}</Text>
      </View>

      <GestureDetector gesture={composedGesture}>
        <View style={{flex: 1}}>
          <Animated.View
            style={[
              styles.imgCenter,
              animatedLikedStyle,
            ]}>
            <LikedIcon height={90} width={90} />
          </Animated.View>
          <Animated.Image
            source={{uri: cardItem?.urlToImage}}
            style={[styles.img, animatedStyle, {zIndex: 11}]}
          />
        </View>
      </GestureDetector>

      <View style={styles.bottomCardWrapper}>
        <TouchableOpacity
          onPress={likeOnPressHandler}
          hitSlop={{top: 3, bottom: 3, left: 10, right: 10}}>
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
  author: {fontWeight: '700', fontSize: 12, color: Colors.color_000000},
  img: {width: '100%', height: 430},
  bottomCardWrapper: {
    flexDirection: 'row',
    marginTop: 4,
    paddingHorizontal: 12,
  },
  likes: {
    fontWeight: '700',
    fontSize: 12,
    color: Colors.color_000000,
    paddingHorizontal: 12,
    marginTop: 10,
  },
  imgCenter : {
    position: 'absolute',
    top: '45%',
    left: '45%',
    flex: 1,
    zIndex: 100,
  }
});
