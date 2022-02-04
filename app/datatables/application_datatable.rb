class ApplicationDatatable
  def initialize(view)
    @view = view
  end

  def as_json(options = {})
    fetch_resource
    if options[:refresh]
      data_refresh
    else
      data
    end
  end
end
