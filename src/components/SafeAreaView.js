import {
  Platform,
} from 'react-native'
import IOSSafeAreaView from 'react-native-safe-area-view'
import { SafeAreaView as AndroidSafeAreaView } from 'react-native-safe-area-context'

export default (Platform.OS === 'ios' ? IOSSafeAreaView : AndroidSafeAreaView)