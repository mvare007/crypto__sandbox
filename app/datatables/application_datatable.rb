class ApplicationDatatable
  def initialize(view)
    @view = view
  end

  # Fetching the resource from the database and then returning the data.
  def as_json(options = {})
    fetch_resource
    refresh(options[:refresh])

    data
  end
end
