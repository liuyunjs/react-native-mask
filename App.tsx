import React from 'react';
import { View, Text } from 'react-native';
import { DarklyText } from 'rn-darkly';
import { Mask } from './library/main';

export default function () {
  const [visible, setVisible] = React.useState(false);
  return (
    <View style={{ flex: 1, marginTop: 44 }}>
      <DarklyText
        dark_style={{ color: '#eee' }}
        onPress={() => setVisible(true)}>
        show mask
      </DarklyText>
      {visible && <Mask />}
    </View>
  );
}
