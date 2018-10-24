export default {
	data: {
		things: [0, 0, 0, 0, 0]
	},

	html: `
		<p>0</p>
		<p>1</p>
		<p>2</p>
		<p>3</p>
		<p>4</p>
	`,

	test(assert, component, target) {
		console.group('set');
		component.set({
			things: [0, 0, 0]
		});
		console.groupEnd();

		assert.htmlEqual(target.innerHTML, `
			<p>0</p>
			<p>1</p>
			<p>2</p>
		`);
	}
};
