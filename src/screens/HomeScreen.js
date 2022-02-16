import React, {
  useState,
  useRef,
} from 'react'
import {
  Image,
  Text,
  View,
} from 'react-native'
import {connect} from 'react-redux'

import {
  AccentColor,
  TextColor0,
  SecondaryAccentColor0,
} from '../utils/appTheme'
import {sleep} from '../utils/sleep'

import {
  logOut
} from '../../redux/actioncreators'

import {
  fetch_repo_commits,
} from '../api/repos'


import BaseComp from '../components/BaseComp'
import Header from '../components/Header'
import NotificationPanel from '../components/NotificationPanel';
import PrimaryButton from '../components/PrimaryButton'
import SearchInput from '../components/SearchInput'
import SecondaryButton from '../components/SecondaryButton'

import GitHuBLogo from '../assets/img_icons/github_logo.png'

function HomeScreen (props) {
  const [search_query, setSearchQuery] = useState('facebook/react-native')
  const [is_searching, setSearching] = useState(false)
  const [commits, setCommits] = useState([])
  const page = 1
  const per_page = 20
  const notification_panel = useRef()
  const searchInput = useRef()

  const handeleSearchQueryChange = search_query => {
    setSearchQuery(search_query)
  }

  const search = async () => {
    try {
      setSearching(true)
      var params = {
        owner_n_repo: search_query,
        per_page,
        page,
      }
      const response = await fetch_repo_commits(params)
      if (response.ok) {
        const res = await response.json()
        setCommits(res)
        // console.log('commit res', res)
        setSearching(false)
        notification_panel.current._showMessage(
          'Search Successful',
          '',
          'success'
        )
        await sleep(3000)
        props.navigation.navigate('ResultScreen', {
          ...params,
          commits
        })
      } else {
        const res = await response.json()
        console.log('commit err', res)
        notification_panel.current._showMessage(
          'Search Failed',
          res.message,
          'error'
        )
      }
      setSearching(false)
    } catch (error) {
      notification_panel.current._showMessage(
        'Search Failed',
        error.message,
        'error'
      )
      setSearching(false)
    }
  }

  return (
    <BaseComp
      bg_type='solid_color'
    >
    <View
      style={{
        flex: 1,
      }}
    >
      <Header 
        title='Home'
        leftChildComponent={(
          <SecondaryButton
            text='Log Out'
            width={120}
            onPress={() => props.logOut()}
          />
        )}
      />
      <View
        style={{
          flex: 1,
          alignItems: 'center',
        }}
      >
        <Image 
          source={GitHuBLogo}
          style={{
            height: 80,
            width: 80,
            marginTop: 100,
          }}
          resizeMode='contain'
        />
        <Text
          style={{
            color: TextColor0,
            fontSize: 18,
            textAlign: 'center',
            marginBottom: 20,
            marginTop: 25,
          }}
        >
          Find a GitHub Repo Commits
        </Text>   
        <SearchInput 
          search_query={search_query}
          onChangeText={handeleSearchQueryChange}
          // onSubmit={this.search}
          placeholder="Search repos"
          ref={searchInput}
        />   
        <PrimaryButton
          disabled={is_searching}
          is_loading={is_searching}
          text="Search"
          onPress={() =>  search()}
          containerStyles={{
            marginTop: 20,
          }}
        />

      </View>
    </View>
    <NotificationPanel  ref={notification_panel} parent_has_statusbar={false} />         
    </BaseComp>
  )
}

const mapStateToProps = state => ({
})

const mapDispatchToProps = {
  logOut,
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)
