import { StyleProp, TextStyle, ViewProps, ViewStyle } from 'react-native';
import { icon } from '../assets/icons';

export interface storeTypeData {
  id?: number;
  name: string;
}
export interface storeTypeDisp extends storeTypeData {
  editMode: boolean;
}

export interface itemTypeData {
  id?: number;
  name: string;
  store: number;
}
export interface itemTypeDisp extends itemTypeData {
  editMode: boolean;
}

export interface todoTypeData {
  id?: number;
  name: string;
}
export interface todoTypeDisp extends todoTypeData {
  editMode: boolean;
}

export interface standardButtonProps extends ViewProps {
  onPress: () => void;
  magnitude?: number;
}

export interface iconButtonProps extends standardButtonProps {
  icon: icon;
  colorIcon: string;
  styleButton?: StyleProp<ViewStyle>;
  sizeIcon?: number;
  styleIcon?: StyleProp<any>;
}

export interface checkButtonProps extends standardButtonProps {
  titleCheckButton: string;
  onCheckPress?: () => void;
  onBack?: () => void;
  deleteMode?: boolean;
  stylesView?: StyleProp<ViewStyle>;
  stylesCheckButton?: StyleProp<ViewStyle>;
  stylesCheckButtonText?: StyleProp<TextStyle>;
}

export interface checkButtonIconProps extends iconButtonProps {
  iconCheckButton: React.ReactNode;
  onCheckPress?: () => void;
  onBack?: () => void;
  deleteMode?: boolean;
  stylesView?: StyleProp<ViewStyle>;
  stylesCheckButton?: StyleProp<ViewStyle>;
  stylesCheckButtonText?: StyleProp<TextStyle>;
}
