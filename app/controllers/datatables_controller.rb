class DatatablesController < ApplicationController
	def exchanges
		# @exchanges = @client.exchanges
		# render json: @exchanges
	end

	def coins
		datatable = CoinsDatatable.new(view_context)
		render json: datatable
	end

	def coins_refresh
		client = CoingeckoRuby::Client.new
		coins_data = 'yo'
		# coins_data = client.markets(nil, vs_currency: Current.vs_currency.symbol, price_change_percentage: '1h,7d')
		ActionCable.server.broadcast('CoinsChannel', coins_data: coins_data)
	end
end
