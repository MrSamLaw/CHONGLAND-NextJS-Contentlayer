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
	let monthsAgo = currentDate.getMonth() - targetDate.getMonth() + 12;
	//console.log('months ' + monthsAgo);
	let daysAgo = currentDate.getDate() - targetDate.getDate();
	//console.log('days ' + daysAgo);

	let formattedDate = '';

	if (yearsAgo > 1) {
		formattedDate = `${yearsAgo}y ago`;
	} else if (monthsAgo > 1 && monthsAgo <= 11) {
		formattedDate = `${monthsAgo} mths ago`;
	} else if (monthsAgo == 1) {
		formattedDate = `${monthsAgo} mth ago`;
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

export function ViewCounter({
	slug,
	allViews,
}: {
	slug: string;
	allViews: {
		slug: string;
		count: number;
	}[];
	trackView?: boolean;
}) {
	const viewsForSlug = allViews && allViews.find((view) => view.slug === slug);
	const number = new Number(viewsForSlug?.count || 0);

	return (
		<span className='txt-neutral-600 dark:text-neutral-400'>
			{`${number.toLocaleString()} views`}
		</span>
	);
}
