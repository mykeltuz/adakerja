import React, {useRef } from 'react'
import {
  TextInput,
  TouchableOpacity,
  View, 
} from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign'

import {
  TextColor0,
  TextColor2,
} from '../utils/appTheme'

export default function SearchInput (props) {
  const searchInput = useRef()

  const _blur = () => {
    searchInput.current.blur()
  }

  const _focus = () => {
    searchInput.current.focus()
  }

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: TextColor2,
        borderRadius: 4,
        borderWidth: 0.5,
        height: 55,
        width: props.width,
        // marginHorizontal: 20,
        margin: 20,
      }}
    >
      <TextInput 
        style={{
          flex: 1,
          fontSize: 16,
          color: TextColor0,
          paddingHorizontal: 10,
        }}
        value={props.search_query}
        onChangeText={props.onChangeText}
        returnKeyType='search'
        placeholder={props.placeholder}
        placeholderTextColor={TextColor2}
        keyboardAppearance={props.is_light ? 'light' : 'dark'}
        ref={searchInput}
        onSubmitEditing={() => props.onSubmit(props.search_query)}
      />
      <TouchableOpacity
        style={{
          padding: 10,
        }}
        onPress={() => props.onSubmit(props.search_query)}
      >
        <AntDesign
          name='search1'
          size={25}
          color={TextColor0}
        />
      </TouchableOpacity>
    </View>
  )
}

SearchInput.defaultProps = {
  search_query: '',
  onChangeText: (() => console.log('text changed')),
  onSubmit: (() => console.log('submitted')),
  is_light: true,
  width: 'auto',
  placeholder: 'Search here',
}