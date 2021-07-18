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
    // @ts-ignore
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

  if (!onPress || disabled) return elem;

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      {elem}
    </TouchableWithoutFeedback>
  );
};

MaskInternal.defaultProps = {
  tintColor: 'rgba(0, 0, 0, .2)',
};

export const Mask = darkly<
  typeof MaskInternal,
  {
    darkTintColor?: ColorValue;
  }
>(MaskInternal, [], ['tintColor']);

Mask.defaultProps = {
  darkTintColor: 'rgba(255, 255, 255, .05)',
};
