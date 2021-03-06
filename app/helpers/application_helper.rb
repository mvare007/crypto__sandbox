module ApplicationHelper
	def percentage_change_fmt(percentage)
		negative = percentage.to_f.negative?
		text_color = negative ? 'text-red-500' : 'text-green-500'
		icon_style = "las la-long-arrow-alt-#{negative ? 'down' : 'up'} #{text_color} mr-1"
		tag.i(nil, class: icon_style) +
		tag.span("#{percentage&.round(2)}%", class: text_color)
	end

	def money_fmt(amount)
		Money.from_amount(amount, Current.vs_currency.symbol).round(3).format rescue '-'
	end

	def price_change_bar_width(current, min, max)
		return 100 if current > max

		(((current - min) * 100) / (max - min)).to_i rescue 0
	end

	def navlink_builder(name, path)
		if current_page?(path)
			link_to name, path, class: 'bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium', aria: { current: 'page' }
		else
			link_to name, path, class: 'text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium'
		end
	end
end
