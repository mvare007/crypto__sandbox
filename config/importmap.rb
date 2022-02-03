# Pin npm packages by running ./bin/importmap

pin "application", preload: true
pin "@hotwired/turbo-rails", to: "turbo.min.js", preload: true
pin "@hotwired/stimulus", to: "stimulus.min.js", preload: true
pin "@hotwired/stimulus-loading", to: "stimulus-loading.js", preload: true
pin_all_from "app/javascript/controllers", under: "controllers"
pin "@rails/actioncable", to: "actioncable.esm.js"
pin_all_from "app/javascript/channels", under: "channels"

pin "simple-datatables" # @3.2.0
pin "dayjs" # @1.10.7
pin "dayjs/plugin/customParseFormat", to: "dayjs--plugin--customParseFormat.js" # @1.10.7
pin "@fortawesome/fontawesome-free", to: "@fortawesome--fontawesome-free.js" # @5.15.4
pin "process" # @2.0.0
