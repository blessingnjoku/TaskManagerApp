import React from "react";
import { Image, SafeAreaView } from "react-native";
import { View, Text, StyleSheet } from "react-native";
import pic from '../assets/pic.jpg'
import { colors } from "../constant/colors";

const TopDiplay = () => {
  return (
    <SafeAreaView >
        <View style={styles.container}>
        <View style={styles.info}>
        <Text style={{fontSize:20, fontWeight:'900', marginBottom:5, color:'#fff'}}>Jasmine Joans</Text>
        <Text style={{ color:'#fff'}}>August, 18, 2023</Text>
      </View>
     
      <Image source={pic} style={styles.pic}/>
  
        </View>
  
      <View style={styles.boder}></View>
    
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    container:{
        width:'100%',
        height:180,
         paddingHorizontal:60,
         paddingVertical:20,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        backgroundColor:colors.pri,
     
    },
    boder:{
        // width:100,
        // borderWidth:1,
        borderColor:"#fff",
        borderTopLeftRadius:50,
        borderTopRightRadius:50,
        height:50,
         position:'relative',
         top:-30,
        marginHorizontal:40,
        backgroundColor:colors.pri,
        
        shadowOffset: {
            width: 0,
            height: 4,
          },
          shadowOpacity: 0.3,
          shadowRadius: 4.65,
      
          elevation: 8,
        


    },
    info:{


    },
    pic:{
        width:80,
        height:80,
        borderRadius:'50%'
    }
});

export default TopDiplay;
