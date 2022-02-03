class CoinGeckoApi::VsCurrencies
	# https://www.coingecko.com/en/api/documentation
	def self.fetch
		client = CoingeckoRuby::Client.new
		vs_currencies = client.supported_currencies
		vs_currencies.each do |vs_currency|
			currency = VsCurrency.find_or_initialize_by(symbol: vs_currency)
			currency.save!
		end
	end
end
