import { View, Text, StyleSheet } from 'react-native';
import { IconButton } from './StandardButtons';
import { primaryColors } from '../assets/colors';
import { icon } from '../assets/icons';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';

export function NavigationBar(props: BottomTabBarProps) {
  function NavigationButton({
    name,
    icon,
    navigateTo,
    isFocused
  }: {
    name: string;
    icon: icon;
    navigateTo: () => void;
    isFocused: boolean;
  }) {
    return (
      <View style={{ alignItems: 'center' }}>
        <IconButton
          icon={icon}
          colorIcon={isFocused ? 'black' : primaryColors.lightGrey}
          sizeIcon={40}
          onPress={navigateTo}
          magnitude={-50}
        />
        <Text>{name}</Text>
      </View>
    );
  }
  return (
    <View style={styles.navigationContainer}>
      {props.state.routes.map((route, index) => {
        const { options } = props.descriptors[route.key];
        const isFocused = props.state.index === index;

        const onPress = () => {
          const event = props.navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true
          });

          if (!isFocused && !event.defaultPrevented) {
            props.navigation.navigate(route.name);
          }
        };
        return (
          <NavigationButton
            key={index}
            name={options.title!}
            icon={route.name as icon}
            navigateTo={onPress}
            isFocused={props.state.index === index}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  navigationContainer: {
    flexDirection: 'row',
    height: '12%',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: primaryColors.background
  }
});
