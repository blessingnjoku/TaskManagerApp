
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';


const AddBtn = ({onPress}) => {
    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <Text style={{fontSize:16, fontWeight:'900', }}>Add Task +</Text>
        </TouchableOpacity>
    );
};


const styles = StyleSheet.create({
    container:{
        
        paddingVertical:13,
        paddingHorizontal:13,
        height:50,
        backgroundColor:'red',
        borderRadius:5,
        textAlign:'center',



    }

});


export default AddBtn;
