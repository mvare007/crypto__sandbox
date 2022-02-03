class VsCurrency < ApplicationRecord
	def to_s
		case symbol
		when 'usd' then '$'
		when 'eur' then '€'
		when 'btc' then '₿'
		when 'gbp' then	'£'
		else
			symbol.upcase
		end
	end
end
