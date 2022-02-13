class CoinsDatatable < ApplicationDatatable
	delegate :render, :tag, :money_fmt, :percentage_change_fmt, to: :@view

	def data
    @resource.map do |coin|
			row = row_builder(coin)
			if @refresh
				{ "#{coin['id']}": row }
			else
				row
			end
    end
  end

	private

	def fetch_resource
		client = CoingeckoRuby::Client.new
		@resource = client.markets(nil, vs_currency: Current.vs_currency.symbol, price_change_percentage: '1h,7d')
	end

	def refresh(option = false)
		@refresh = option
	end

	def row_builder(coin)
		columns(coin).map do |col|
			column_identifier(id: coin['id'], column_name: col[:name]) do
				col[:template]
			end
		end
	end

	def column_identifier(id:, column_name:, &block)
    column = tag.div(id: "#{id}--#{column_name}", class: 'text-sm text-center', &block)
		return column unless @refresh

		{ "#{column_name}": column }
  end

	# The above code is a Ruby method that takes a coin object as an argument and returns an array of
	# hashes. Each hash represents a column in the table. The hash has a name and a template. The
	# template is a string that is rendered by the Rails view.
	def columns(coin)
		[
			{
				name: 'market_cap_rank',
				template: coin['market_cap_rank'].to_s
			},
			{
				name: 'image_card',
				template: render('application/components/image_card',
													text: coin['symbol'],
													subtext: coin['name'],
													img_src: coin['image']
												)
			},
			{
				name: 'current_price',
				template: money_fmt(coin['current_price'])
			},
			{
				name: 'price_change_percentage_1h_in_currency',
				template: percentage_change_fmt(coin['price_change_percentage_1h_in_currency'])
			},
			{
				name: 'price_change_percentage_24h',
				template: percentage_change_fmt(coin['price_change_percentage_24h'])
			},
			{
				name: 'price_change_percentage_7d_in_currency',
				template: percentage_change_fmt(coin['price_change_percentage_7d_in_currency'])
			},
			{
				name: 'market_cap',
				template: money_fmt(coin['market_cap'])
			},
			{
				name: 'price_change_bar',
				template: render('application/components/price_change_bar',
													current: coin['current_price'],
													min: coin['low_24h'],
													max: coin['high_24h']
												)
			},
			{
				name: 'circulating_supply',
				template: money_fmt(coin['circulating_supply'].to_f)
			},
			{
				name: 'total_supply',
				template: money_fmt(coin['total_supply'].to_f)
			}
		]
	end
end
