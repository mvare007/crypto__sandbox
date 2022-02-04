import SimpleDatatableController from "controllers/utils/simple_datatable_controller";

export default class extends SimpleDatatableController {
  bindEvents() {
    this.reload();
  }

  reload() {
    this.element.addEventListener("ComponentRefresh", () => {
      this.refreshData();
    });
  }

  refreshData() {
    fetch(this.urlValue + '?refresh=true');
  }
}
