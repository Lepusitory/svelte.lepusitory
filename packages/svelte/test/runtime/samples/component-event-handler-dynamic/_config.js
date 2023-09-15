export default {
	html: `
		<button>update handler</button>
		<button>0</button>
	`,

	async test({ assert, component, target, window }) {
		const [update_button, button] = target.querySelectorAll('button');
		const event = new window.MouseEvent('click');

		await button.dispatchEvent(event);
		assert.equal(component.count, 1);

		await update_button.dispatchEvent(event);
		await button.dispatchEvent(event);
		assert.equal(component.count, 11);
	}
};
