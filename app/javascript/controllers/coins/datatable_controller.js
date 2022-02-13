import SimpleDatatableController from "controllers/utils/simple_datatable_controller";

export default class extends SimpleDatatableController {
  bindEvents() {
    this.reload();
  }

  reload() {
    ["ComponentRefresh", "VsCurrencyChanged"].forEach(reloadEvent => {
      this.element.addEventListener(reloadEvent, () => {
        this.refreshData();
      });
    });
  }

  refreshData() {
    fetch(this.urlValue + '?refresh=true')
      .then(window.dispatchEvent(new Event('DatatableRefreshed')));
  }
}
