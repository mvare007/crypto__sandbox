module ApplicationHelper
	def percentage_change_fmt(percentage)
		is_negative = percentage.to_f.negative?
		text_color = is_negative ? 'text-red-500' : 'text-green-500'
		icon_style = "las la-long-arrow-alt-#{is_negative ? 'down' : 'up'} #{text_color} mr-1"
		tag.i(nil, class: icon_style) +
		tag.span("#{percentage&.round(2)}%", class: text_color)
	end

	def money_fmt(amount)
		Money.from_amount(amount, Current.vs_currency.symbol).round(3).format
	end

	def price_change_bar_width(current, min, max)
		return 100 if current > max

		(((current - min) * 100) / (max - min)).to_i rescue 0
	end
end
