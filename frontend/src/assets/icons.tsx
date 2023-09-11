import FeatherIcon from 'react-native-vector-icons/Feather';
import IonIconsIcon from 'react-native-vector-icons/Ionicons';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { TextStyle } from 'react-native';
import { primaryColors } from './colors';
import { useState, FunctionComponent } from 'react';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from 'react-native-reanimated';

interface iconProps {
  color: string;
  size?: number;
  style?: TextStyle;
}

interface downUpIconProps extends iconProps {
  direction: 'up' | 'down';
}

export type icon =
  | 'save'
  | 'edit'
  | 'add'
  | 'delete'
  | 'back'
  | 'shopping-cart'
  | 'todo'
  | 'calendar';

const icons = new Map<icon, FunctionComponent<iconProps>>();

icons.set('save', function SaveIcon(props: iconProps) {
  return (
    <FeatherIcon
      name="check"
      color={props.color}
      size={props.size || 30}
      style={props.style}
    />
  );
});

icons.set('edit', function EditIcon(props: iconProps) {
  return (
    <FeatherIcon
      name="edit-2"
      color={props.color}
      size={props.size || 30}
      style={props.style}
    />
  );
});

icons.set('add', function AddIcon(props: iconProps) {
  return (
    <IonIconsIcon
      name="add"
      color={props.color}
      size={props.size || 30}
      style={props.style}
    />
  );
});

icons.set('delete', function DeleteIcon(props: iconProps) {
  return (
    <AntDesignIcon
      name="delete"
      color={props.color}
      size={props.size || 30}
      style={props.style}
    />
  );
});

icons.set('back', function BackIcon(props: iconProps) {
  return (
    <AntDesignIcon
      name="back"
      color={props.color}
      size={props.size || 30}
      style={props.style}
    />
  );
});

icons.set('shopping-cart', function BackIcon(props: iconProps) {
  return (
    <FeatherIcon
      name="shopping-cart"
      color={props.color}
      size={props.size || 30}
      style={props.style}
    />
  );
});

icons.set('todo', function BackIcon(props: iconProps) {
  return (
    <FontAwesome5
      name="tasks"
      color={props.color}
      size={props.size || 30}
      style={props.style}
    />
  );
});

icons.set('calendar', function BackIcon(props: iconProps) {
  return (
    <AntDesignIcon
      name="calendar"
      color={props.color}
      size={props.size || 30}
      style={props.style}
    />
  );
});

export function DownUpIcon(props: downUpIconProps) {
  const [directionState, setDirectionState] = useState(props.direction);
  const direction = useSharedValue(
    props.direction === 'up' ? '0deg' : '180deg'
  );
  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{ rotateZ: direction.value }]
  }));

  if (props.direction !== directionState) {
    direction.value = withTiming(props.direction === 'up' ? '0deg' : '180deg', {
      duration: 250
    });
    setDirectionState(props.direction);
  }

  return (
    <Animated.View style={animatedStyles}>
      <AntDesignIcon
        name={'up'}
        color={props.color || primaryColors.text}
        size={props.size || 20}
        style={props.style}
      />
    </Animated.View>
  );
}

export default icons;
