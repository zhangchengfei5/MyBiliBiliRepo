import React, { Component } from 'react'
import { Image ,Text,StyleSheet } from 'react-native';
import { createAppContainer } from 'react-navigation'
import { createBottomTabNavigator } from "react-navigation-tabs";
import { FirstScreen } from './screens/FirstScreen';
import { PartitionScreen } from './screens/PartitionScreen';
import { UserScreen } from './screens/UserScreen';
import { DynamicScreen } from './screens/DynamicScreen';
import { themeColor } from './data';


export const TabBarNavigator = createAppContainer(
  createBottomTabNavigator(
    {
      FirstScreen:{
            screen:FirstScreen,
            navigationOptions:{
                tabBarIcon:({focused})=>renderTabBar("icon",0,focused),
                tabBarLabel:({focused})=>renderTabBar("label",0,focused)
            }
        },
        PartitionScreen:{
            screen:PartitionScreen,
            navigationOptions:{
                tabBarIcon:({focused})=>renderTabBar("icon",1,focused),
                tabBarLabel:({focused})=>renderTabBar("label",1,focused)
            }
        },
        DynamicScreen:{
            screen:DynamicScreen,
            navigationOptions:{
                tabBarIcon:({focused})=>renderTabBar("icon",2,focused),
                tabBarLabel:({focused})=>renderTabBar("label",2,focused)
            }
        },
        UserScreen:{
            screen:UserScreen,
            navigationOptions:{
                tabBarIcon:({focused})=>renderTabBar("icon",3,focused),
                tabBarLabel:({focused})=>renderTabBar("label",3,focused)
            }
        }
    }
  )
)
  

function renderTabBar(part,page,focused){
  if(part=="icon"){
      switch(page){
          case 0:
              icon=focused?require('./images/home_select.png'):require('./images/home.png')
              style=StyleSheet.create({width:20,height:20})
              break
          case 1:
              icon=focused?require('./images/partition_select.png'):require('./images/partition.png')
              style=StyleSheet.create({width:25,height:25})              
              break
          case 2:
              icon=focused?require('./images/dynamic_select.png'):require('./images/dynamic.png')
              style=StyleSheet.create({width:25,height:25})              
              break
          case 3:
              icon=focused?require('./images/user_select.png'):require('./images/user.png')
              style=StyleSheet.create({width:22,height:22})              
              break
      }
      return <Image source={icon} style={style}/>
  }else{
      switch(page){
          case 0:
              label="首页"
              break
          case 1:
              label="频道"
              break
          case 2:
              label="动态"
              break
          case 3:
              label="我的"
              break
      }
      color=focused?"#E67F9F":"#8a8a8a"
      return <Text style={{color:color,fontSize:12,alignSelf:"center"}}>{label}</Text>
  }
}