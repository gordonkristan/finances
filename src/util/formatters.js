const formatDollarAmount = (amount) => {
	const formattedAmount = `$${amount.toLocaleString()}`;

	if (formattedAmount.includes('.')) {
		return formattedAmount.slice(0, formattedAmount.lastIndexOf('.') + 3);
	} else {
		return formattedAmount;
	}
};

const formatBillingFrequency = (frequency) => {
	return `${frequency[0].toUpperCase()}${frequency.slice(1)}`;
};

export {
	formatDollarAmount,
	formatBillingFrequency
};