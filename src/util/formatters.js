const formatDollarAmount = (amount) => {
	return `$${amount.toLocaleString()}`;
};

const formatBillingFrequency = (frequency) => {
	return `${frequency[0].toUpperCase()}${frequency.slice(1)}`;
};

export {
	formatDollarAmount,
	formatBillingFrequency
};