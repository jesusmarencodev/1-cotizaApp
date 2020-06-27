/* eslint-disable quotes */
/* eslint-disable comma-dangle */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function ResultCalculate(props) {
	const { capital, interest, months, total, errorMessage } = props;
	return (
		<View style={styles.content}>
			{total && (
				<View style={styles.boxResult}>
					<Text style={styles.title}>SUMMARY</Text>
          <DataResult title="Requested amount" value={`$${capital}`} />
          <DataResult title="Interest percentage" value={`${interest}%`} />
          <DataResult title="Months" value={`${months}`} />
          <DataResult title="Monthly payment" value={`$${total.monthlyFee}`} />
          <DataResult title="Total to pay" value={`$${total.totalPayable}`} />
				</View>
			)}
			<View>
				<Text style={styles.error}>{errorMessage}</Text>
			</View>
		</View>
	);
}

function DataResult(props) {
	const { title, value } = props;

	return (
		<View style={styles.value}>
			<Text>{title}</Text>
      <Text>{value}</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	error: {
		textAlign: 'center',
		color: '#f00',
		fontWeight: 'bold',
		fontSize: 20
	},
	content: {
		marginHorizontal: 40
	},
	boxResult: {
		padding: 30
	},
	title: {
		fontSize: 20,
		textAlign: 'center',
		fontWeight: 'bold',
		marginBottom: 20
	},
	value: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginBottom: 10
	}
});
