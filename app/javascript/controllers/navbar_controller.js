import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
	static targets = [
		'vsCurrencySelect'
	];

	connect() {
		this.onChangeVsCurrencySelect();
		this.onDatatableRefreshed();
	}

	onChangeVsCurrencySelect() {
		this.vsCurrencySelectTarget.addEventListener('change', () => {
			this.vsCurrencySelectTarget.setAttribute("disabled", "disabled");
			this.vsCurrencySelectTarget.dispatchEvent(new Event("VsCurrencyChanged"));
		});

	}

	onDatatableRefreshed() {
		window.addEventListener('DatatableRefreshed', () => {
			this.vsCurrencySelectTarget.removeAttribute("disabled");
		});
	}
}
