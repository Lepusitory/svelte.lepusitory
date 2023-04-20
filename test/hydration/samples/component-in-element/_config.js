export default {
	snapshot(target) {
		const div = target.querySelector('div');
		const p = target.querySelector('p');

		return {
			div,
			p,
			text: p.childNodes[0]
		};
	}
};
