import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  runOnJS
} from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { ViewProps, View } from 'react-native';
import { primaryColors } from '../assets/colors';
import { DimensionValue } from 'react-native/Libraries/StyleSheet/StyleSheetTypes';

interface swipeWrapperProps extends ViewProps {
  state: any;
  stateHandler: React.SetStateAction<any>;
  swipableWidth?: DimensionValue;
  swipbaleHeight?: DimensionValue;
}

export function SwipeWrapper(props: swipeWrapperProps) {
  const pressed = useSharedValue(false);
  const offset = useSharedValue(0);

  const animatedStyles = useAnimatedStyle(() => {
    const value = Math.max(255 - Math.round(Math.abs(offset.value) / 2), 0);
    const color = value > 9 ? value.toString(16) : '0' + value.toString(16);
    return {
      backgroundColor:
        Math.abs(offset.value) > 40
          ? `#ff${color}${color}`
          : primaryColors.background
    };
  });

  const pan = Gesture.Pan()
    .onBegin(() => {
      pressed.value = true;
    })
    .onChange((event) => {
      offset.value = event.translationX;
    })
    .onFinalize(() => {
      if (Math.abs(offset.value) > 80) {
        runOnJS(props.stateHandler)(props.state);
      } else {
        offset.value = withTiming(0);
        pressed.value = false;
      }
    });

  return (
    <View
      style={{
        width: '100%',
        alignItems: 'center'
      }}
    >
      <Animated.View style={[props.style, animatedStyles]}>
        {props.children}
      </Animated.View>
      <GestureDetector gesture={pan}>
        <Animated.View
          style={[
            props.style,
            {
              position: 'absolute',
              left: 0,
              height: props.swipbaleHeight || '100%',
              width: props.swipableWidth || '80%',
              opacity: 0.1
            }
          ]}
        />
      </GestureDetector>
    </View>
  );
}
