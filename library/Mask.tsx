import React from 'react';
import {
  TouchableWithoutFeedback,
  StyleSheet,
  ViewProps,
  ColorValue,
} from 'react-native';
import { OneOfAnimConf, RMotionView } from 'rmotion';
import { darkly } from 'rn-darkly';

type OverlayProps = ViewProps & {
  tintColor?: ColorValue;
  onPress?: () => void;
  disabled?: boolean;
  config?: OneOfAnimConf;
};

const hide = { opacity: 0 };
const show = { opacity: 1 };

const MaskInternal: React.FC<OverlayProps> = ({
  tintColor,
  onPress,
  disabled,
  config,
  style,
  ...rest
}) => {
  const elem = (
    <RMotionView
      {...rest}
      config={config}
      from={hide}
      animate={show}
      exit={hide}
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
