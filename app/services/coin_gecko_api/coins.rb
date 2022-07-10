class CoinGeckoApi::Coins
	# https://www.coingecko.com/en/api/documentation
	def self.fetch
		CoingeckoRuby::Client.new.markets(
			nil,
			vs_currency: Current.vs_currency.symbol,
			price_change_percentage: '1h,7d'
		)
	end
end
