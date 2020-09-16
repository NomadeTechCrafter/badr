import { setJSExceptionHandler } from 'react-native-exception-handler'
import { Alert } from 'react-native'

export default setGlobalHandler = () => {
    const errorHandler = (e, isFatal) => {
        if (isFatal) {
            const errorString = `Error: ${(isFatal) ? 'Fatal:' : ''} ${e.name} ${e.message}`
            Alert.alert(
                'Unexpected error occurred',
                `
        ${errorString}
        We have captured this issue and it will be fixed in next release. Sorry for this inconvenient.`,
                [{
                    text: 'Ok',
                    onPress: () => {
                    }
                }]
            )
        } else {
            console.log(e)
        }
    }

    setJSExceptionHandler(errorHandler, true)
    //Patrick: Set true to enable it in DEBUG mode. Otherwise, it only works in release mode
}