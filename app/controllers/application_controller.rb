class ApplicationController < ActionController::Base
	before_action :set_current_vs_currency

	private

	def set_current_vs_currency
		Current.vs_currency ||= VsCurrency.find_by(symbol: 'usd')
	end
end
