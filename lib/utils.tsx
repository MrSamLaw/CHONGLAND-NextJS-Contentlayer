export function formatDate(date: string) {
	let currentDate = new Date();
	if (!date.includes('T')) {
		date = `${date}T00:00:00`;
	}
	let targetDate = new Date(date);
	let reorderDate = new Date(date);

	//console.log('current ' + currentDate);
	//console.log('target ' + targetDate);

	let yearsAgo = currentDate.getFullYear() - targetDate.getFullYear();
	//console.log('years ' + yearsAgo);
	let monthsAgo = currentDate.getMonth() - targetDate.getMonth();
	//console.log('months ' + monthsAgo);
	let daysAgo = currentDate.getDate() - targetDate.getDate();
	//console.log('days ' + daysAgo);

	let formattedDate = '';

	if (yearsAgo > 0) {
		formattedDate = `${yearsAgo}y ago`;
	} else if (monthsAgo > 0) {
		formattedDate = `${monthsAgo}mth ago`;
	} else if (daysAgo > 0) {
		formattedDate = `${daysAgo}d ago`;
	} else {
		formattedDate = 'Today';
	}

	const month = [
		'January ',
		'February ',
		'March ',
		'April ',
		'May ',
		'June ',
		'July ',
		'August ',
		'September ',
		'October ',
		'November ',
		'December ',
	];

	let RDate =
		month[reorderDate.getMonth()] +
		reorderDate.getDate() +
		', ' +
		reorderDate.getFullYear();

	let fullDate = targetDate.toLocaleString('en-au', {
		month: 'long',
		day: 'numeric',
		year: 'numeric',
	});
	return `${RDate} - [${formattedDate}]`;
}
