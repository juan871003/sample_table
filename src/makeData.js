import namor from "namor";

const range = (len) => {
	const arr = [];
	for (let i = 0; i < len; i++) {
		arr.push(i);
	}
	return arr;
};

const newPerson = (additionalColumns = 0) => {
	const statusChance = Math.random();
	const initialData = {
		firstName: namor.generate({ words: 1, numbers: 0 }),
		lastName: namor.generate({ words: 1, numbers: 0 }),
		age: Math.floor(Math.random() * 30),
		visits: Math.floor(Math.random() * 100),
		progress: Math.floor(Math.random() * 100),
		status:
			statusChance > 0.66
				? "relationship"
				: statusChance > 0.33
				? "complicated"
				: "single",
	};
	for (let i = 1; i <= additionalColumns; i++) {
		initialData[`additional_column_${i}`] = namor.generate({
			words: 1,
			numbers: 0,
		});
	}
	return initialData;
};

export default function makeData(additionalColumns, ...lens) {
	const makeDataLevel = (depth = 0) => {
		const len = lens[depth];
		return range(len).map((d) => {
			return {
				...newPerson(additionalColumns),
				subRows: lens[depth + 1] ? makeDataLevel(depth + 1) : undefined,
			};
		});
	};

	return makeDataLevel();
}
