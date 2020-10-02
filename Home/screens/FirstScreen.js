import React, { Component } from 'react';
import { View,Text,Image,Dimensions,TextInput } from 'react-native';
import {createAppContainer} from "react-navigation";
import {createMaterialTopTabNavigator} from "react-navigation-tabs"
import { LivingScreen } from './LivingScreen';
import { RecommendScreen } from './RecommendScreen';
import { HotScreen } from './HotScreen';
import { AnimationScreen } from './AnimationScreen';

// 获取屏幕的宽高
var { width } = Dimensions.get('window')
var FirstLabel =["直播","推荐","热门","追番"];

export class FirstScreen extends Component{
    constructor(props){
        super(props);
        this.state={
            search:""
        }
    }
    render(){
        return(
            <View style={{flex:1,backgroundColor:"#fff"}}>
                <View style={{flexDirection:"row",alignItems:"center",justifyContent:"center",height:30,marginTop:3,paddingHorizontal:5}}>
                    <Image source={require('../images/headimage.jpg')} style={{width:30,height:30,borderRadius:15,marginTop:3}}/>
                    <View style={{backgroundColor:'#dcdcdc',borderRadius:12,marginHorizontal:8,flexDirection:"row",
                        marginTop:3,flex:1}}>
                        <Image source={require('../images/bdf.png')} style={{width:20,height:20,alignSelf:"center"}}/>
                        <TextInput style={{fontSize:13,padding:3,maxHeight:24,flex:1}}
                            onChangeText={(text)=>{
                                this.setState({
                                    search:text
                                })
                            }}
                            value={this.state.search}/>
                    </View>
                    <Image source={require('../images/game.png')} style={{width:24,height:24,marginTop:3,marginRight:8}}/>
                    <Image source={require('../images/mail.png')} style={{width:22,height:22,marginTop:3}}/>
                </View>
                <FirstTab/>
            </View>
            
        )
    }
}

const FirstTab = createAppContainer(
    createMaterialTopTabNavigator(
        {
            Living:{
                screen:LivingScreen,
                navigationOptions:{
                    tabBarLabel:({focused})=>renderTabBarLabel(0,focused)                                
                }
            },
            Recommend:{
                screen:RecommendScreen,
                navigationOptions:{
                    tabBarLabel:({focused})=>renderTabBarLabel(1,focused)                                
                }
            },
            Hot:{
                screen:HotScreen,
                navigationOptions:{
                    tabBarLabel:({focused})=>renderTabBarLabel(2,focused)                                
                }
            },
            Animation:{
                screen:AnimationScreen,
                navigationOptions:{
                    tabBarLabel:({focused})=>renderTabBarLabel(3,focused)                                
                }
            },
        },
        {
            initialRouteName:"Recommend",
            tabBarOptions:{
                scrollEnabled:true,
                style:{
                    backgroundColor:"transparent",
                    height:40,
                },
                tabStyle:{
                    width:width/4,
                },
                indicatorStyle:{
                    backgroundColor:"#E67F9F",
                }
            }
        }
    )
)

function renderTabBarLabel(page,focused) {
    return <Text style={{color:focused?"#E67F9F":"#8a8a8a",
                fontSize:15,
                alignSelf:"center",
                fontWeight:focused?"bold":"normal"}}>
                    {FirstLabel[page]}
                </Text>
}