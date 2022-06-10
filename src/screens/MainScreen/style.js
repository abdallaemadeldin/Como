import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ADD8E6'
    },
    inputHolder: {
        width: '96%',
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        marginTop: 100,
        paddingHorizontal: 6
    },
    input: {
        backgroundColor: '#fff',
        borderRadius: 4,
        width: '100%',
        height: 50,
        color: '#000',
        fontSize: 16
    },
    errorMsg: {
        fontSize: 12,
        color: 'red',
        alignSelf: 'flex-start'
    },
    button: {
        width: '90%',
        height: 44,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        overflow: 'hidden',
        backgroundColor: '#f1f1f1',
        marginBottom: 100
    },
    buttonHolder: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    buttonLabel: {
        color: '#000',
        fontWeight: 'bold'
    },
    disabledButton: {
        opacity: .6
    },
    overlayLoading: {
        position: 'absolute',
        zIndex: 100,
        bottom: 0,
        left: 0,
        right: 0,
        top: 0,
        backgroundColor: '#0009',
        justifyContent: 'center',
        alignItems: 'center'
    },
    actionStyle: {
        flex: 1,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    actionsHolder: {
        flexDirection: 'row',
        height: 50,
        backgroundColor: '#000',
        width: '100%'
    },
    cameraStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});