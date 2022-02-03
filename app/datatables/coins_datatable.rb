class CoinsDatatable < ApplicationDatatable
	delegate :render, :money_fmt, :percentage_change_fmt, :supply_fmt, to: :@view

	def data
    @resource.map do |coin|
      [].tap do |column|
				column << coin['market_cap_rank'].to_s
				column << render('layouts/components/table/image_card', text: coin['symbol'], subtext: coin['name'], img_src: coin['image'])
				column << money_fmt(coin['current_price'])
				column << percentage_change_fmt(coin['price_change_percentage_1h_in_currency'])
				column << percentage_change_fmt(coin['price_change_percentage_24h'])
				column << percentage_change_fmt(coin['price_change_percentage_7d_in_currency'])
				column << money_fmt(coin['market_cap'])
				column << render('layouts/components/price_change_bar',
													current: coin['current_price'],
													min: coin['low_24h'],
													max: coin['high_24h'])
				column << money_fmt(coin['circulating_supply'].to_f)
				column << money_fmt(coin['total_supply'].to_f)
      end
    end
  end

  def fetch_resource
		client = CoingeckoRuby::Client.new
		@resource = client.markets(nil, vs_currency: Current.vs_currency.symbol, price_change_percentage: '1h,7d')
  end
end
