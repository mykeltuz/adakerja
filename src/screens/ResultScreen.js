import React, {
  useEffect,
  useState,
  useRef,
} from 'react'
import {
  ActivityIndicator,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import {connect} from 'react-redux'
import AntDesign from 'react-native-vector-icons/AntDesign'

import {
  AccentColor,
  TextColor0,
  SecondaryAccentColor0,
  CardColor0,
  AccentColor2,
  TextColor2,
} from '../utils/appTheme'

import {
  logOut
} from '../../redux/actioncreators'

import {
  fetch_repo_commits,
} from '../api/repos'


import BaseComp from '../components/BaseComp'
import EmptyScreen from '../components/EmptyScreen'
import Header from '../components/Header'
import Loading from '../components/Loading'
import NotificationPanel from '../components/NotificationPanel';
import SecondaryButton from '../components/SecondaryButton'

import GitHuBLogo from '../assets/img_icons/github_logo.png'
import ListIcon from '../assets/svg_icons/ListIcon'




function ResultScreen (props) {
  const [commits, setCommits] = useState([])
  const [is_loading, setLoading] = useState(true)
  const [is_loading_more, setLoadingMore] = useState(false)
  const [at_end_of_list, setAtEndOfList] = useState(false)
  const [owner_n_repo, setOwnerNRepo] = useState('')
  const [per_page, setPerPage] = useState(20)
  const [page, setPage] = useState(1)  
  const notification_panel = useRef()

  useEffect(() => {
    console.log('setting data')
    
    setCommits([...props.route.params.commits])
    console.log(props.route.params.commits[0])
    setOwnerNRepo(props.route.params.owner_n_repo)
    setPerPage(props.route.params.per_page)
    setPage(props.route.params.page + 1)
    setLoading(false)
  }, []);

  const loadMoreData = async () => {
    try {
      var params = {
        owner_n_repo: owner_n_repo,
        per_page,
        page,
      }
      const response = await fetch_repo_commits(params)
      if (response.ok) {
        const res = await response.json()
        setCommits([...commits, res])
        setPage(page+1)
        console.log('commit res', res[0])
        
        
      } else {
        const res = await response.json()
        console.log('commit err', res)
        notification_panel.current._showMessage(
          'Data Load Failed',
          res.message,
          'error'
        )
      }
    } catch (error) {
      notification_panel.current._showMessage(
        'Data Load Failed',
        error.message,
        'error'
      )
    }
  }

  const handleLoadMore = async () => {
    console.log('at_end_of_list', at_end_of_list)
    if(!is_loading_more && !at_end_of_list) {      
      setLoadingMore(true)
      await loadMoreData()
      setLoadingMore(false)
    }
  }

  const renderFooterLoading = () => {
    return (
      <> 
      {
        is_loading_more ? (
          <View
            style={{
              height: 55,
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <ActivityIndicator
              color={AccentColor}
              size='large'
            />
          </View>
        ) : null
      }
      </>
      
      
    );
  }

  const renderItem = ({ item, index }) => {
    // console.log('item.author', item.author)
    // console.log('item.commit', (item.commit !== undefined && item.commit !== null && item.commit.author !== undefined && item.commit.author !== null))
    return (
      <TouchableOpacity
        style={{
          marginHorizontal: 20,
          marginVertical: 5,
          padding: 20,
          borderRadius: 9,
          backgroundColor: CardColor0,
          elevation: 2,
          shadowOffset: {
            width: 0.00,
            height: -0.00
          },
          shadowOpacity: 0.15,
          shadowRadius: 2,
          flexDirection: 'row',
          
        }}
        onPress={() => {
          // this.props.navigation.navigate('IssueItemDetail', { issue: item })
        }}
      >
        {
          (item.author !== null && item.author !== undefined  && item.author.avatar_url !== undefined && item.author.avatar_url !== null) ? (
            <Image 
              source={{uri: item.author.avatar_url}}
              style={{
                width: 30,
                height: 30
              }}
              resizeMode="contain"
              borderRadius={15}
            />
          ) : (
            <View
              style={{
                width: 30,
                height: 30,
                borderRadius: 15,
                backgroundColor: AccentColor2,
                justifyContent: 'center',
                alignItems: "center",
              }}
            >
              <AntDesign
                name='user'
                color={AccentColor}
                size={20}
              />
            </View>
          )
        }
        <View
          style={{
            flex: 1,
            marginLeft: 10,
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <Text
              style={{
                color: TextColor0,
                fontSize: 18,
                flex: 1,
              }}
              numberOfLines={1}
            >
              {
                (item.commit !== undefined && item.commit !== null && item.commit.author !== undefined && item.commit.author !== null) ? (
                  (`${item.commit.author.name }`)
                ) : 'Default name'
              }
            </Text> 
            <Text
              style={{
                color:  TextColor2,
                fontSize: 14,
                flex: 1,
                // fontWeight: 'bold',
                textAlign: 'right'
              }}
              numberOfLines={2}
            >
              {
                item.commit !== undefined && item.commit !== null && item.commit.committer !== undefined && item.commit.committer !== null && item.commit.committer.name !== undefined && item.commit.committer.name !== null && (
                  item.commit.committer.name 
                )
              }
            </Text> 
          </View>
          <Text
            style={{
              color:  TextColor2,
              fontSize: 14,
              flex: 1,
              marginTop: 10,
            }}
            numberOfLines={2}
          >
            {
              item.commit !== undefined && item.commit !== null && item.commit.message !== undefined && item.commit.message !== null && (
                item.commit.message
              )
            }
          </Text> 
        </View>
        
        
        
      </TouchableOpacity>
    )
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
        title={`${props.route.params.owner_n_repo} Commits`}
        nav_action='go_back'
        leftChildComponent={(
          <SecondaryButton
            text='Log Out'
            width={100}
            onPress={() => props.logOut()}
          />
        )}
        navigation={props.navigation}
      />
      {
        is_loading && (
          <Loading />
        )
      }
      {
        !is_loading  && (
          <FlatList
            data={commits}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            ListEmptyComponent={() => (
              <EmptyScreen
                icon={ListIcon}
                title='Nothing to show!'
                message={`Hmm!!! That happened`}
                navigation={props.navigation}
                button_text="Go Back"
                onPress={() => props.navigation.goBack()}
              />
            )}
            // ListFooterComponent={renderFooterLoading}
            // onEndReachedThreshold={0.2}
            // onEndReached={handleLoadMore}
          />
        )
      }
      
    
    </View>
    <NotificationPanel  ref={notification_panel} parent_has_statusbar={true} />         
    </BaseComp>
  )
}

// class ResultScreen1 extends React.Component {
//   state ={
//     commits: [],

//     is_loading: true,
//     is_loading_more: false,
//     at_end_of_list: false,
//     per_page: 20,
//     page: 2,
//     owner_n_repo: '',
//   }

//   componentDidMount() {
//     this.setState({
//       ...this.state,
//       commits: this.props.route.params.commits,
//       per_page: this.props.route.params.per_page,
//       page: this.props.route.params.page,
//       owner_n_repo: this.props.route.params.owner_n_repo,
//       is_loading: false,
//     })
//   }


//   loadMoreData = async () => {
//     try {      
//       var params = {
//         owner_n_repo: this.state.owner_n_repo,
//         per_page: this.state.per_page,
//         page: this.state.page,
//       }
//       const response = await fetch_repo_commits(params)
//       if (response.ok) {
//         const res = await response.json()
//         await this.setState({
//           ...this.state,
//           commits: [...this.state.commits, res],
//           page: this.state.page + 1,
//         })
//         // console.log('commit res', res[0])
        
        
//       } else {
//         const res = await response.json()
//         console.log('commit err', res)
//         this.notification_panel._showMessage(
//           'Data Load Failed',
//           res.message,
//           'error'
//         )
//       }
//     } catch (error) {
//       this.notification_panel._showMessage(
//         'Data Load Failed',
//         error.message,
//         'error'
//       )
//     }
//   }

//   handleLoadMore = async () => {
//     console.log('at_end_of_list', this.state.at_end_of_list)
//     if(!this.state.is_loading_more && !this.state.at_end_of_list) {     
//       this.setState({
//         ...this.state,
//         is_loading_more: true
//       }) 
//       await this.loadMoreData()
//       this.setState({
//         ...this.state,
//         is_loading_more: false
//       }) 
//     }
//   }

//   renderFooterLoading = () => {
//     return (
//       <> 
//       {
//         this.state.is_loading_more ? (
//           <View
//             style={{
//               height: 55,
//               width: '100%',
//               justifyContent: 'center',
//               alignItems: 'center',
//             }}
//           >
//             <ActivityIndicator
//               color={AccentColor}
//               size='large'
//             />
//           </View>
//         ) : null
//       }
//       </>
      
      
//     );
//   }

//   renderItem = ({ item, index }) => {
//     // console.log('item.author', item.author)
//     return (
//       <TouchableOpacity
//         style={{
//           marginHorizontal: 20,
//           marginVertical: 5,
//           padding: 20,
//           borderRadius: 9,
//           backgroundColor: CardColor0,
//           elevation: 2,
//           shadowOffset: {
//             width: 0.00,
//             height: -0.00
//           },
//           shadowOpacity: 0.15,
//           shadowRadius: 2,
//           flexDirection: 'row',
          
//         }}
//         onPress={() => {
//           // this.props.navigation.navigate('IssueItemDetail', { issue: item })
//         }}
//       >

//         {
//           (item.author !== null && item.author !== undefined  && item.author.avatar_url !== undefined && item.author.avatar_url !== null) ? (
//             <Image 
//               source={{uri: item.author.avatar_url}}
//               style={{
//                 width: 30,
//                 height: 30
//               }}
//               resizeMode="contain"
//               borderRadius={15}
//             />
//           ) : (
//             <View
//               style={{
//                 width: 30,
//                 height: 30,
//                 borderRadius: 15,
//                 backgroundColor: AccentColor2,
//                 justifyContent: 'center',
//                 alignItems: "center",
//               }}
//             >
//               <AntDesign
//                 name='user'
//                 color={AccentColor}
//                 size={20}
//               />
//             </View>
//           )
//         }
//         <View
//           style={{
//             flex: 1,
//             marginLeft: 10,
//           }}
//         >
//           <View
//             style={{
//               flexDirection: 'row',
//               alignItems: 'center',
//             }}
//           >
//             <Text
//               style={{
//                 color: TextColor0,
//                 fontSize: 18,
//                 flex: 1,
//               }}
//               numberOfLines={1}
//             >
//               {
//                 (item.commit !== undefined && item.commit !== null && item.commit.author !== undefined && item.commit.author !== null) ? (
//                   (`${item.commit.author.name }`)
//                 ) : 'Default name'
//               }
//             </Text> 
//             <Text
//               style={{
//                 color:  TextColor2,
//                 fontSize: 14,
//                 flex: 1,
//                 // fontWeight: 'bold',
//                 textAlign: 'right'
//               }}
//               numberOfLines={2}
//             >
//               {
//                 item.commit !== undefined && item.commit !== null && item.commit.committer !== undefined && item.commit.committer !== null && item.commit.committer.name !== undefined && item.commit.committer.name !== null && (
//                   item.commit.committer.name 
//                 )
//               }
//             </Text> 
//           </View>
//           <Text
//             style={{
//               color:  TextColor2,
//               fontSize: 14,
//               flex: 1,
//               marginTop: 10,
//             }}
//             numberOfLines={2}
//           >
//             {
//               item.commit !== undefined && item.commit !== null && item.commit.message !== undefined && item.commit.message !== null && (
//                 item.commit.message
//               )
//             }
//           </Text> 
//         </View>
        
      
//       </TouchableOpacity>
//     )
//   }

//   render() {
//     return (
//       <BaseComp
//         bg_type='solid_color'
//       >
//       <View
//         style={{
//           flex: 1,
//         }}
//       >
//         <Header 
//           title={`${this.props.route.params.owner_n_repo} Commits`}
//           nav_action='go_back'
//           leftChildComponent={(
//             <SecondaryButton
//               text='Log Out'
//               width={100}
//               onPress={() => this.props.logOut()}
//             />
//           )}
//           navigation={this.props.navigation}
//         />
//         {
//           this.state.is_loading && (
//             <Loading />
//           )
//         }
//         {
//           !this.state.is_loading  && (
//             <FlatList
//               data={this.state.commits}
//               renderItem={this.renderItem}
//               keyExtractor={(item, index) => index.toString()}
//               ListEmptyComponent={() => (
//                 <EmptyScreen
//                   icon={ListIcon}
//                   title='Nothing to show!'
//                   message={`Hmm!!! That happened`}
//                   navigation={this.props.navigation}
//                   button_text="Go Back"
//                   onPress={() => this.props.navigation.goBack()}
//                 />
//               )}
//               ListFooterComponent={this.renderFooterLoading}
//               onEndReachedThreshold={0.2}
//               onEndReached={this.handleLoadMore}
//             />
//           )
//         }
        
      
//       </View>
//       <NotificationPanel  ref={c => this.notification_panel = c} parent_has_statusbar={true} />         
//       </BaseComp>
//     )
//   }


// }

const mapStateToProps = state => ({
})

const mapDispatchToProps = {
  logOut,
}

export default connect(mapStateToProps, mapDispatchToProps)(ResultScreen)
