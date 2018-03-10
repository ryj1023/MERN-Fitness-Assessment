import React, { Component } from 'react';
import Header from '../headers/header';
import Navigation from '../navigations/navigation';
import Container from '../containers/container';
import { connect } from 'react-redux';
import './profile.css'

class Profile extends Component {
    constructor(props){
		super(props);
		this.state = {
            userName: null,
        };
    }
    
    async componentDidMount() {
        const res = await fetch('/api/users')
        const userData = await res.json()
        console.log('userData', userData)
        // this.setState({
        //     userName: userData[0].userName
        // })
      }

	render(){        
		return(
            <div>
                <Navigation />
                <table className="vitamins">
        <thead>
            <tr>
                <th>Vitamin</th>
                <th>classNameification</th>
                <th>Sources</th>
                <th>Adequate Intake (AI)</th>
            </tr>
        </thead>
        <tfoot>
            <tr>
                <td colspan="4">
                    <p><strong>mcg</strong> stands for micrograms. <strong>IU</strong> stands for International Units</p>
               
                </td>
            </tr>
        </tfoot>
        <tbody>
            <tr>
                <td>A</td>
                <td>fat-soluble</td>
                <td>Dark-colored fruit</td>
                <td>3,000 IU/day</td>
            </tr>
            <tr>
                <td>B</td>
                <td>water-soluble</td>
                <td>Lean meats</td>
                <td>1 mcg/day</td>
            </tr>
            <tr>
                <td>B 1</td>
                <td>water-soluble</td>
                <td>Lean meats</td>
                <td>2.2 mcg/day</td>
            </tr>
            <tr>
                <td>B 6</td>
                <td>water-soluble</td>
                <td>Nuts</td>
                <td>1.7 mg/day</td>
            </tr>
            <tr>
                <td>B 12</td>
                <td>water-soluble</td>
                <td>Meat</td>
                <td>2.4 mcg/day</td>
            </tr>
            <tr>
                <td>C</td>
                <td>water-soluble</td>
                <td>Broccoli</td>
                <td>90 mg/day</td>
            </tr>
            <tr>
                <td>D</td>
                <td>fat-soluble</td>
                <td>Fish</td>
                <td>600 IU/day</td>
            </tr>
            <tr>
                <td>E</td>
                <td>fat-soluble</td>
                <td>Avocado</td>
                <td>33 IU/day</td>
            </tr>
            <tr>
                <td>K</td>
                <td>fat-soluble</td>
                <td>Cabbage</td>
                <td>120 mcg/day</td>
            </tr>
        </tbody>
    </table>
            </div>
        ) 
	}
}

const mapStateToProps = (state) => {
	return {
		questions: state.questions,
		answers: state.answers,
		clientDietInfo: state.clientInfo,
		foodList: state.foodList,
		nutritionFacts: state.nutritionFacts,
	}
}
export default connect(mapStateToProps)(Profile)
