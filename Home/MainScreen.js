import React, { Component } from 'react'
import { Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FirstScreen } from './screens/FirstScreen';
import { PartitionScreen } from './screens/PartitionScreen';
import { UserScreen } from './screens/UserScreen';
import { DynamicScreen } from './screens/DynamicScreen';
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default class MainScreen extends Component {
    constructor(props){
        super(props);
    }
    render() {
        return (
            <NavigationContainer>
                <Stack.Navigator mode="modal" headerMode="none">
                    <Stack.Screen name="home" options={{title:'首页'}} component={TabBar}/>
                    <Stack.Screen name="partition" option={{title:'频道'}} component={PartitionScreen} />
                    <Stack.Screen name="dynamic" option={{title:'动态'}} component={DynamicScreen} />
                    <Stack.Screen name="user" option={{title:'我的'}} component={UserScreen} />
                </Stack.Navigator>
            </NavigationContainer>
        );
    }
};
function TabBar(){
    return(
      <Tab.Navigator
        initialRouteName="首页"
        screenOptions={({route})=>({
          tabBarIcon:({focused,size,color})=>{
            let icon;
            if(route.name==="首页"){
              icon = focused ?
               (
                <Image
                  source={ require('./images/home_select.png') }
                  style={{ width: 20, height: 20, }} />
              ) : ( <Image
                source={ require('./images/home.png') }
                style={{ width: 20, height: 20, }} />)
            }else if(route.name==="频道"){
              icon = focused ? (
                <Image
                  source={ require('./images/partition_select.png') }
                  style={{ width: 25, height: 25, }} />
              ) : (<Image
                source={ require('./images/partition.png') }
                style={{ width: 25, height: 25, }} />)
            }else if(route.name==="动态"){
                icon = focused ? (
                  <Image
                    source={ require('./images/dynamic_select.png') }
                    style={{ width: 25, height: 25, }} />
                ) : (<Image
                  source={ require('./images/dynamic.png') }
                  style={{ width: 25, height: 25, }} />)
              }else if(route.name==="我的"){
                icon = focused ? (
                  <Image
                    source={ require('./images/user_select.png') }
                    style={{ width: 22, height: 22, }} />
                ) : (<Image
                  source={ require('./images/user.png') }
                  style={{ width: 22, height: 22, }} />)
              }
            return icon;
          }
        })}
        tabBarOptions={{activeTintColor:"#FFB6C1",inactiveTintColor:"gray"}}
      >
        <Tab.Screen name="首页" component={FirstScreen}/>
        <Tab.Screen name="频道" component={PartitionScreen}/>
        <Tab.Screen name="动态" component={DynamicScreen}/>
        <Tab.Screen name="我的" component={UserScreen}/>
      </Tab.Navigator>
    )
};
// function FirstTitle() {
//   return(
        // <View style={{flexDirection:"row",paddingHorizontal:5,paddingVertical:3,alignItems:"center"}}>
        //     <Image source={require('../images/headimage.jpg')} style={{width:26,height:26,borderRadius:13,marginTop:3}}/>
        //   <View style={{backgroundColor:'#dcdcdc',borderRadius:12,marginHorizontal:8,flexDirection:"row",
        //       marginTop:3,flex:1}}>
        //       <Image source={require('../images/bdf.png')} style={{width:18,height:18,alignSelf:"center"}}/>
        //       <TextInput style={{fontSize:12,padding:3,maxHeight:22,flex:1}}
        //           onChangeText={(text)=>{
        //               this.setState({
        //                   search:text
        //               })
        //           }}
        //           value={this.state.search}/>
        //   </View>
        //   <Image source={require('../images/game.png')} style={{width:20,height:20,marginTop:3,marginRight:8}}/>
        //   <Image source={require('../images/mail.png')} style={{width:20,height:20,marginTop:3}}/>
        // </View>      
//   );
// }