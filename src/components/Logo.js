import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import Animated from 'react-native-reanimated';

const Logo = ({scale}) => (
    <View>
        <Animated.View style={{...styles.logo, transform: [{scale}]}}>
            <Image
            source={require("../images/logo-with-no-bg.png")}
            />
        </Animated.View>
    </View>
);

export default Logo;

const styles = StyleSheet.create({
    logo: {
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center'
    }
})
