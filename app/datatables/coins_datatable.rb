class CoinsDatatable < ApplicationDatatable
	delegate :render, :money_fmt, :percentage_change_fmt, :supply_fmt, :tag, to: :@view

	def data
    @resource.map do |coin|
			@identifier = coin['id']
      [].tap do |column|
				column << refreshable_col('market_cap_rank') { coin['market_cap_rank'].to_s }
				column << render('application/components/image_card', text: coin['symbol'], subtext: coin['name'], img_src: coin['image'])
				column << refreshable_col('current_price') { money_fmt(coin['current_price']) }
				column << refreshable_col('price_change_percentage_1h_in_currency') { percentage_change_fmt(coin['price_change_percentage_1h_in_currency']) }
				column << refreshable_col('price_change_percentage_24h') { percentage_change_fmt(coin['price_change_percentage_24h']) }
				column << refreshable_col('price_change_percentage_7d_in_currency') { percentage_change_fmt(coin['price_change_percentage_7d_in_currency']) }
				column << refreshable_col('market_cap') { money_fmt(coin['market_cap']) }
				column << refreshable_col('price_change_bar') { render('application/components/price_change_bar', current: coin['current_price'], min: coin['low_24h'], max: coin['high_24h']) }
				column << refreshable_col('circulating_supply') { money_fmt(coin['circulating_supply'].to_f) }
				column << money_fmt(coin['total_supply'].to_f)
			end
    end
  end

	def data_refresh
		data = []
    @resource.map do |coin|
				data << {
					id: coin['id'],
					current_price: money_fmt(coin['current_price']),
					price_change_percentage_1h_in_currency: percentage_change_fmt(coin['price_change_percentage_1h_in_currency']),
					price_change_percentage_24h: percentage_change_fmt(coin['price_change_percentage_24h']),
					price_change_percentage_7d_in_currency: percentage_change_fmt(coin['price_change_percentage_7d_in_currency']),
					market_cap: money_fmt(coin['market_cap']),
					price_change_bar: render('application/components/price_change_bar', current: coin['current_price'], min: coin['low_24h'], max: coin['high_24h']),
					circulating_supply: money_fmt(coin['circulating_supply'].to_f)
				}
    end

		data
  end

	def column_index
		[
			{ column_name: 'market_cap_rank', refreshable: false, data: [] },
			{ column_name: 'image_card', refreshable: false, data: [] },
			{ column_name: 'current_price', refreshable: true, data: [] },
			{ column_name: 'price_change_percentage_1h_in_currency', refreshable: true, data: [] },
			{ column_name: 'price_change_percentage_24h', refreshable: true, data: [] },
			{ column_name: 'market_cap', refreshable: true, data: [] },
			{ column_name: 'price_change_bar', refreshable: true, data: [] },
			{ column_name: 'circulating_supply', refreshable: true, data: [] },
			{ column_name: 'price_change_bar', refreshable: true, data: [] },
			{ column_name: 'total_supply', refreshable: false, data: [] }
		]
	end

	private

	def refreshable_col(field, &block)
    tag.div(id: identifier(field), &block)
  end

	def identifier(name = @identifier, field)
		"#{name}__#{field}"
	end

  def fetch_resource
		client = CoingeckoRuby::Client.new
		@resource = client.markets(nil, vs_currency: Current.vs_currency.symbol, price_change_percentage: '1h,7d')
  end
end
