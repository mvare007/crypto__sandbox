import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
	static targets = [
		'vsCurrencySelect'
	];

	connect() {
		this.onChangeVsCurrencySelect();
		this.onDatatableRefresh();
	}

	onChangeVsCurrencySelect() {
		this.vsCurrencySelectTarget.addEventListener('change', () => {
			this.vsCurrencySelectTarget.setAttribute("disabled", "disabled");
			this.vsCurrencySelectTarget.dispatchEvent(new Event("VsCurrencyChanged"));
		});

	}

	onDatatableRefresh() {
		window.addEventListener('DatatableRefresh', () => {
			this.vsCurrencySelectTarget.removeAttribute("disabled");
		});
	}
}
