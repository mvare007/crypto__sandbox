class ApplicationDatatable
  def initialize(view)
    @view = view
  end

  def as_json(options = {})
    fetch_resource
    return data unless options[:only_json]
  end
end
