class Types::QueryType < Types::BaseObject
  # Add root-level fields here.
  # They will be entry points for queries on your schema.

  # TODO: remove me
  field :omen, Types::OmenType.connection_type, null: false, description: 'Fetch Omen'

  def omen(latitude: nil, longitude: nil)
    Oman.all
  end

  field :nearby, Types::OmenType.connection_type, null: false, description: 'Fetch Omen' do
    argument :latitude, Float, required: true
    argument :longitude, Float, required: true
  end

  def nearby(latitude: nil, longitude: nil)
    Oman.joins(:location).by_distance(origin: [latitude, longitude])
  end
end
