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
                <Stack.Navigator headerMode="none">
                    <Stack.Screen name="home" options={{title:'首页'}} component={TabBar} />
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
//     <View style={{height:50}}>
//       <Image source={require('./images/headimage.jpg')} style={{width:30,height:30,borderRadius:15}}/>
//       <View style={{backgroundColor:'#8a8a8a',flex:1,borderBottomLeftRadius:5,borderBottomRightRadius:5}}>
//         <Image source={require('./images/bdf.png')} style={{width:10,height:10}}/>
//         <TextInput style={{height:10,fontSize:12}} maxLength={16} 
//          onChangeText={(text)=>{
//            if(text!=""){this.state.text=text}
//          }}
//          value={this.state.text}/>
//       </View>
//       <Image source={require('./images/mail.png')} style={{width:20,height:20}}/>
//     </View>
//   );
// }
// export default TabBarNavigator = createBottomTabNavigator(
//     {
//         First:{
//             screen:FirstScreen,
//             navigitonOptions:{
//                 tarBarIcon:({focused})=>renderTabBar("icon",0,focused),
//                 tarBarLabel:({focused})=>renderTabBar("label",0,focused)
//             }
//         },
//         Partition:{
//             screen:PartitionScreen,
//             navigitonOptions:{
//                 tarBarIcon:({focused})=>renderTabBar("icon",1,focused),
//                 tarBarLabel:({focused})=>renderTabBar("label",1,focused)
//             }
//         },
//         Dynamic:{
//             screen:DynamicScreen,
//             navigitonOptions:{
//                 tarBarIcon:({focused})=>renderTabBar("icon",2,focused),
//                 tarBarLabel:({focused})=>renderTabBar("label",2,focused)
//             }
//         },
//         User:{
//             screen:UserScreen,
//             navigitonOptions:{
//                 tarBarIcon:({focused})=>renderTabBar("icon",3,focused),
//                 tarBarLabel:({focused})=>renderTabBar("label",3,focused)
//             }
//         },
//     }
// )

// function renderTaBar(part,page,focused) {
//     if(part=="icon"){
//         switch (page) {
//             case 0:
//                 icon=focused?require("./images/home_select.png"):require("./images/home.png")
//                 break;
//             case 1:
//                 icon=focused?require("./images/partition_select.png"):require("./images/partition.png")
//                 break;
//             case 2:
//                 icon=focused?require("./images/dynamic_select.png"):require("./images/dynamic.png")
//                 break;
//             case 3:
//                 icon=focused?require("./images/user_select.png"):require("./images/user.png")
//                 break;
//         }
//         return <Image source={icon} style={{width:20,height:20}}/>
//     }else{
//         switch(page){
//             case 0:
//                 label="首页"
//                 break
//             case 1:
//                 label="分区"
//                 break
//             case 2:
//                 label="动态"
//                 break
//             case 3:
//                 label="我的"
//                 break
//         }
//         color=focused?"ffb6c1":"8a8a8a"
//         return <Text style={{color:color,fontSize:12,alignSelf:"center"}}>{label}</Text>
//     }
// }