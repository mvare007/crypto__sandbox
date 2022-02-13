class ApplicationController < ActionController::Base
	before_action :set_current_vs_currency, :set_vs_currencies_for_select

	private

	def set_current_vs_currency
		Current.vs_currency ||= VsCurrency.find_by(symbol: [cookies[:vs_currency] || 'usd'])
	end

	def set_vs_currencies_for_select
		filtered_list = %w[ btc eth ltc bch bnb eos xrp xlm link dot yfi bits sats]
		@vs_currencies_for_select = VsCurrency.all.filter do |currency|
			filtered_list.exclude?(currency.symbol)
		end
	end
end
