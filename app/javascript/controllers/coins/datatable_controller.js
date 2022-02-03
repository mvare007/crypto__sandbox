import SimpleDatatableController from "controllers/utils/simple_datatable_controller";

export default class extends SimpleDatatableController {
  static values = { refreshUrl: String };

  bindEvents() {
    this.reload();
  }

  reload() {
    this.element.addEventListener("ComponentRefresh", () => {
      this.refreshData();
    });
  }

  refreshData() {
    fetch(this.refreshUrlValue);
  }
}
