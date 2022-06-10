import { useState, useRef } from 'react';
import { Linking, Platform } from 'react-native';
import axios from 'axios';
import { v4 } from 'uuid';
import Firestore from '@react-native-firebase/firestore';
import { check, PERMISSIONS } from 'react-native-permissions';

export const useMainScreen = () => {
    const animationRef = useRef();
    const [qrcode, setQrCode] = useState('');
    const [fullname, setFullname] = useState('');
    const [error, setError] = useState('');
    const [visible, setVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isFlashOn, setIsfFlashOn] = useState(0);
    const [cameraPermission, setCameraPermission] = useState('');

    const isDisabled = error !== '' || fullname === '';

    const onChangeName = value => {
        const fullname = value.trim();
        if (fullname === '' || fullname.length <= 0) setError('This field is mandatory*');
        else setError('');
        setFullname(value);
    }

    const fetchContent = (code) => {
        if (!isNaN(code))
            axios.get(`https://docs.bcomo.com/qrcode/${code}`, {
                headers: { 'x-api-key': 'Abdalla' }
            }).then(onSuccess).catch(error => {
                alert(error?.message || "Something Went Wrong!");
                setLoading(false);
            })
    }

    const onSuccess = ({ data }) => {
        if (!isNaN(data.phoneNumber)) {
            const msg = data.message.replace('{{Full Name}}', fullname);
            Firestore().collection("Users").doc(fullname.trim()).collection("Events").add({
                ...data,
                message: msg,
                id: v4(),
                createdAt: new Date(),
                code: qrcode,
            }).then(() => {
                Linking.openURL(`sms:${data.phoneNumber}?body=${msg}`).then(() => {
                    setLoading(false);
                });
            });
        }

        else {
            alert(`Invalid phone number:${data.phoneNumber}`);
            setLoading(false);
        }
    }

    const onScanSuccess = ({ data }) => {
        if (qrcode === '') setQrCode(data);
        if (isNaN(data)) {
            alert('Invalid QrCode!');
            setQrCode('');
            return;
        }
        setLoading(true);
        hideModal();
        fetchContent(data);
    }

    const showModal = () => {
        if (Platform.OS === 'android') {
            check(PERMISSIONS.ANDROID.CAMERA).then(setCameraPermission);
        } else if (Platform.OS === 'ios') {
            check(PERMISSIONS.IOS.CAMERA).then(setCameraPermission);
        }
        setVisible(true);
    }
    const hideModal = () => setVisible(false);

    const toggleFlash = () => setIsfFlashOn(st => st === 0 ? 2 : 0);

    return {
        animationRef,
        error,
        fullname,
        isDisabled,
        visible,
        isFlashOn,
        loading,
        cameraPermission,
        toggleFlash,
        showModal,
        hideModal,
        onChangeName,
        onScanSuccess,
    }
};