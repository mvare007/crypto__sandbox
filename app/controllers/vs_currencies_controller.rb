class VsCurrenciesController < ActionController::Base
	def switch
		cookies.delete(:vs_currency)
		cookies[:vs_currency] = {
			value: params[:vs_currency],
			expires: 1.year.from_now
		}
	end
end
