import {View, Image} from 'react-native';
import {useState} from 'react';
import {COLORS} from '../../constants/colors';

const PreviewImage = ({image}) => {
  const [imageWidth, setImageWidth] = useState(0);
  const [imageHeight, setImageHeight] = useState(0);

  return (
    <View style={{alignItems: 'center', borderRadius: 6}}>
      <Image
        source={{uri: image}}
        style={{
          width: '50%',
          height: 300,
          borderWidth: 3,
          borderColor: COLORS.GOLD,
          borderRadius: Math.min(imageWidth, imageHeight) / 5,
        }}
        resizeMode="contain"
        onLayout={event => {
          const {width, height} = event.nativeEvent.layout;
          setImageWidth(width);
          setImageHeight(height);
        }}
      />
    </View>
  );
};

export default PreviewImage;
