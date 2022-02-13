import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
	static targets = [
		'vsCurrencySelect'
	];

	connect() {
		this.onChangeVsCurrencySelect();
	}

	onChangeVsCurrencySelect() {
		this.vsCurrencySelectTarget.addEventListener('change', () => {
			this.vsCurrencySelectTarget.dispatchEvent(new Event("VsCurrencyChanged"))
		});
	}
}
