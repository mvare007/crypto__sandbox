Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  root 'home#index'
  get '/datatables/coins', to: 'datatables#coins'
  get '/datatables/exchanges', to: 'datatables#exchanges'
  post '/vs_currencies/switch', to: 'vs_currencies#switch'
end
