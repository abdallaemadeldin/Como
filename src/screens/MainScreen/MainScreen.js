import React from 'react';
import { SafeAreaView, TextInput, View, Modal, TouchableOpacity, Text, Dimensions, ActivityIndicator } from 'react-native';
import LottieView from 'lottie-react-native';
import { RNCamera } from 'react-native-camera';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { useMainScreen } from '../../hooks/mainScreen.hook';
import styles from './style';

const MainScreen = () => {
    const {
        container,
        inputHolder,
        input,
        errorMsg,
        button,
        buttonHolder,
        buttonLabel,
        disabledButton,
        overlayLoading,
        actionStyle,
        actionsHolder,
        cameraStyle
    } = styles;
    const {
        animationRef,
        error,
        fullname,
        isDisabled,
        visible,
        isFlashOn,
        loading,
        toggleFlash,
        showModal,
        hideModal,
        onChangeName,
        onScanSuccess
    } = useMainScreen();
    const QRCODE_WIDTH = Dimensions.get('window').width * 65 / 100;
    const actions = [{
        icon: 'close',
        onPress: hideModal,
    }, {
        icon: isFlashOn === 0 ? 'flash-off' : 'flash',
        onPress: toggleFlash
    }];

    return (
        <SafeAreaView style={container}>
            <View style={inputHolder}>
                <TextInput
                    placeholder='Enter Fullname'
                    placeholderTextColor={'#0005'}
                    value={fullname}
                    onChangeText={onChangeName}
                    style={input}
                />
                {error !== '' && <Text style={errorMsg}>{error}</Text>}
            </View>

            <View style={buttonHolder}>
                <TouchableOpacity disabled={isDisabled} style={isDisabled ? { ...button, ...disabledButton } : button} onPress={showModal}>
                    <Text style={buttonLabel}>SCAN QRCODE</Text>
                </TouchableOpacity>
            </View>

            <Modal visible={visible} animationType='slide' onRequestClose={hideModal}>
                <View style={actionsHolder}>
                    {
                        actions.map(action => {
                            return (
                                <TouchableOpacity style={actionStyle} onPress={action.onPress}>
                                    <Icon name={action.icon} size={24} color='#fff' />
                                </TouchableOpacity>

                            );
                        })
                    }
                </View>
                <RNCamera
                    style={cameraStyle}
                    onBarCodeRead={onScanSuccess}
                    captureAudio={false}
                    flashMode={isFlashOn}
                    onCameraReady={() => animationRef?.current?.play() && animationRef?.current?.play()}
                >
                    <LottieView
                        source={require('../../assets/qrcode-reader.json')}
                        loop
                        ref={animationRef}
                        style={{ width: QRCODE_WIDTH, height: QRCODE_WIDTH }} />
                </RNCamera>
            </Modal>

            {loading && <View style={overlayLoading}>
                <ActivityIndicator color='#fff' size='large' />
            </View>}

        </SafeAreaView>
    );
}

export default MainScreen;