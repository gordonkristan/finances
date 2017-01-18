const formatDollarAmount = (amount) => {
	let formattedAmount = `$${amount.toLocaleString()}`;

	if (formattedAmount.includes('.')) {
		formattedAmount = formattedAmount.slice(0, formattedAmount.lastIndexOf('.') + 3);

		if (formattedAmount.indexOf('.') === formattedAmount.length - 2) {
			formattedAmount += '0';
		}
	}

	return formattedAmount;
};

const formatBillingFrequency = (frequency) => {
	return `${frequency[0].toUpperCase()}${frequency.slice(1)}`;
};

export {
	formatDollarAmount,
	formatBillingFrequency
};