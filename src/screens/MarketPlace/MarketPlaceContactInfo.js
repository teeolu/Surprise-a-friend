import React, { PureComponent } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { Input, Card, SelectList } from '../../components';
import { states } from '../../constants';

class MarketPlaceContactInfo extends PureComponent {
	state = {
		isStateModalVisible: false,
		isCityModalVisible: false
	}

	componentWillUnmount() {
		this.setState({ isStateModalVisible: false, isCityModalVisible: false })
	}
	validateInput = arg => {
		let valid = true;
		Object.keys(arg).map(el => {
			valid = valid && arg[el].error;
		});
		return valid;
	}

	handleSubmit = event => {
		// const { firstName, lastName, email, password } = inputInfo;
		// const { requestSignupAction, navigation } = this.props;

		// var inValid = this.validateInput(this.state.fields);
		// if (inValid) {
		//     return this.setState({
		//         formError: true,
		//         errorMessage: "Ensure your inputs are valid"
		//     })
		// };

		// requestSignupAction({
		//     email: email.value,
		//     firstName: firstName.value,
		//     lastName: lastName.value,
		//     password: password.value,
		//     navigation,
		//     navigateTo: 'Login'
		// });
	}

	toggleModal = type => () => this.setState((prevState) => ({ [type]: !prevState[type] }));

	renderStateModal = () => {
		return (
			<SelectList
				data={states.states}
				isVisible={this.state.isStateModalVisible}
				title="Select state"
				handleChange={this.props.handleChange}
				type={"stateName"}
				toggleModal={this.toggleModal('isStateModalVisible')}
			/>
		);
	}

	renderCityModal = () => {
		const { inputInfo, handleChange } = this.props;
		const { stateName: { value } } = inputInfo;
		var data = value && value.length > 0 ? states.states[value] : ["You haven't selected a state"]
		let cityNames = {};

		data.map(el => {
			cityNames[el] = el;
		});

		return (
			<SelectList
				data={cityNames}
				isVisible={this.state.isCityModalVisible}
				title="Select local government"
				handleChange={handleChange}
				type={"cityName"}
				toggleModal={this.toggleModal('isCityModalVisible')}
			/>
		);
	}

	render() {
		const { inputInfo, blur, handleChange } = this.props;

		return (
			<KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
				<Card
					title="MARKET PLACE CONTACT INFO"
					style={{ flex: 1 }}
				>
					<Input
						full
						blur={blur}
						inputInfo={inputInfo}
						email
						type="email"
						placeholder="e.g official-email@email.com"
						label="Email address"
						onChangeText={handleChange("email")}
						style={{ marginBottom: 25 }}
					/>
					<Input
						full
						blur={blur}
						inputInfo={inputInfo}
						type="number"
						label="Phone number"
						placeholder="e.g +2348012345678"
						onChangeText={handleChange("number")}
						style={{ marginBottom: 25 }}
					/>
					<Input
						full
						inputInfo={inputInfo}
						blur={blur}
						type="stateName"
						label="State"
						placeholder="Select a state in Nigeria"
						value={inputInfo.stateName.value}
						pressAble
						editable={false}
						onPress={this.toggleModal('isStateModalVisible')}
						style={{ marginBottom: 25 }}
					/>
					<Input
						full
						inputInfo={inputInfo}
						blur={blur}
						type="city"
						label="City"
						placeholder="Select city"
						editable={false}
						value={inputInfo.cityName.value}
						pressAble
						onPress={this.toggleModal('isCityModalVisible')}
						onChangeText={handleChange("city")}
						style={{ marginBottom: 25 }}
					/>
					<Input
						full
						inputInfo={inputInfo}
						blur={blur}
						type="street"
						label="Street"
						onChangeText={handleChange("street")}
						style={{ marginBottom: 25 }}
					/>
				</Card>
				{this.renderStateModal()}
				{this.renderCityModal()}
			</KeyboardAwareScrollView>
		)
	}
}

export default MarketPlaceContactInfo;