import { TextInput, ViewStyle } from 'react-native';
import { primaryColors } from '../assets/colors';
import { StyleProp } from 'react-native';

type standardInputProps = {
  placeholder: string;
  onChange: (text: string) => void;
  onEnter?: () => void;
  value?: string;
  style?: StyleProp<ViewStyle>;
};

export function StandardInput(props: standardInputProps) {
  return (
    <TextInput
      placeholder={props.placeholder}
      value={props.value}
      autoFocus={true}
      clearTextOnFocus={true}
      onChangeText={props.onChange}
      onEndEditing={() => {
        if (props.onEnter) {
          props.onEnter();
        }
      }}
      style={[
        {
          borderRadius: 5,
          height: 40,
          padding: 0,
          fontSize: 30,
          color: primaryColors.text,
          textAlignVertical: 'top'
        },
        props.style
      ]}
    />
  );
}
