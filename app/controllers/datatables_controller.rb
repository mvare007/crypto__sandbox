class DatatablesController < ApplicationController
	def exchanges
		# @exchanges = @client.exchanges
		# render json: @exchanges
	end

	def coins
		datatable = CoinsDatatable.new(view_context)
		if params[:refresh]
			ActionCable.server.broadcast('CoinsChannel', datatable.as_json(refresh: true))
		else
			render json: datatable
		end
	end
end

