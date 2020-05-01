import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Dimensions } from 'react-native';
import { Left, Right, Icon, Drawer, Container } from 'native-base';
import { globals, componentStyles, headerStyles } from './GlobalStyles';

const dimensions = Dimensions.get('window');
const imageHeight = Math.round(dimensions.width * 9 / 16);
const imageWidth = dimensions.width;

export default class Header extends React.Component {
    constructor(props) {
        super(props);
        
    }
    
    
      render() {
        return (
            <>
                <View style={headerStyles.viewContainer}>
                    <View style={headerStyles.viewRow}>
                        <TouchableOpacity style={headerStyles.logo}>
                            <Icon style={{color: "white"}} type="MaterialCommunityIcons" name='movie-roll' />
                        </TouchableOpacity>
        
                        <Text style={headerStyles.logoText}>Hounds Drive In</Text>
                    </View>

                    <View style={headerStyles.viewHamburger}>
                        <TouchableOpacity style={headerStyles.hamburger} onPress={this.props.toggleOpen}>
                            <Icon type="MaterialCommunityIcons" name='menu' />
                        </TouchableOpacity>
                    </View>
                </View>
            </>
        );
      }
}