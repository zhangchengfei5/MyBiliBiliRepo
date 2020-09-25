import React, { Component } from 'react';
import { View,Text,Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { LivingScreen } from './LivingScreen';
import { RecommendScreen } from './RecommendScreen';
import { HotScreen } from './HotScreen';
import { AnimationScreen } from './AnimationScreen';

const FirstStack = createStackNavigator();
const FirstTab = createMaterialTopTabNavigator();

export class FirstScreen extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <FirstTab.Navigator initialRouteName="Recommend" 
                tabBarOptions={{
                    activeTintColor:"#FFB6C1",
                    inactiveTintColor:"gray",
                    tabStyle:{height:50},
                    labelStyle:{fontSize:18},
                    indicatorStyle:{backgroundColor:"#FFB6C1"}
                }}
            >
                <FirstTab.Screen name="Living" component={LivingScreen} options={{title:"直播"}}/>
                <FirstTab.Screen name="Recommend" component={RecommendScreen} options={{title:"推荐"}}/>
                <FirstTab.Screen name="Hot" component={HotScreen} options={{title:"热门"}}/>
                <FirstTab.Screen name="Animation" component={AnimationScreen} options={{title:"追番"}}/>
            </FirstTab.Navigator>
        );
    }
}