Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  root 'home#index'
  post '/vs_currencies/switch', to: 'vs_currencies#switch'
  get :coins, to: 'coins#index', path: 'cryptocurrencies'

  namespace :datatables do
    get :coins
    get :exchanges
  end
end
