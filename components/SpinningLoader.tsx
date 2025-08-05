import React, { useEffect, useRef } from 'react';
import { Animated, Easing } from 'react-native';
import { Loader } from 'lucide-react-native';

const SpinningLoader = React.memo(({ size = 32, color = '#000' }: {size: number, color: string}) => {
  const spinValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const spinAnim = Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
      { resetBeforeIteration: true }
    );
    spinAnim.start();
    return () => spinAnim.stop();
  }, [spinValue]);

  const rotate = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <Animated.View style={{ transform: [{ rotate }] }}>
      <Loader size={size} color={color} />
    </Animated.View>
  );
});

export default SpinningLoader;
