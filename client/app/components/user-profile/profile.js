import React, {Component} from 'react';
import Header from '../headers/header';
import Navigation from '../navigations/navigation';

export default class Profile extends Component{
	render(){
		return(
            <div>
                <Navigation />
                <h1>This is your Profile Page</h1>
            </div>
        ) 
	}
}
