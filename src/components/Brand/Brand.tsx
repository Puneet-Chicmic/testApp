import React from 'react';
import { View, Image, ImageResizeMode } from 'react-native';
import { useTheme } from '../../hooks';
import { Layout, Images } from '../../themes';

interface Props {
  height?: number;
  width?: number;
  mode?: ImageResizeMode;
}

const Brand: React.FC<Props> = ({ height = 200, width = 200, mode = 'contain' }) => {
  const { Layout, Images } = useTheme();

  return (
    <View testID={'brand-img-wrapper'} style={{ height, width }}>
      <Image testID={'brand-img'} style={Layout.fullSize} source={Images.logo} resizeMode={mode}/>
    </View>
  );
};

export default Brand;
