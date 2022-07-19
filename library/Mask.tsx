import * as React from 'react';
import {
  TouchableWithoutFeedback,
  StyleSheet,
  ViewProps,
  ColorValue,
} from 'react-native';
import { OneOfAnimConf, RMotionView } from 'rmotion';
import { fadeIn, fadeOut } from 'rmotion/dist/animations/main';
import { darkly } from 'rn-darkly';

type OverlayProps = ViewProps & {
  tintColor?: ColorValue;
  onPress?: () => void;
  disabled?: boolean;
} & OneOfAnimConf;

const MaskInternal: React.FC<OverlayProps> = ({
  tintColor,
  onPress,
  disabled,
  style,
  ...rest
}) => {
  const elem = (
    <RMotionView
      {...rest}
      keyframes
      animate={fadeIn}
      exit={fadeOut}
      style={[
        StyleSheet.absoluteFill,
        style,
        { zIndex: 1, backgroundColor: tintColor },
      ]}
    />
  );

  if (!onPress) return elem;

  return (
    <TouchableWithoutFeedback disabled={disabled} onPress={onPress}>
      {elem}
    </TouchableWithoutFeedback>
  );
};

export const Mask = darkly(MaskInternal, 'style', 'tintColor');

Mask.defaultProps = {
  dark_tintColor: 'rgba(255, 255, 255, .05)',
  tintColor: 'rgba(0, 0, 0, .2)',
};
