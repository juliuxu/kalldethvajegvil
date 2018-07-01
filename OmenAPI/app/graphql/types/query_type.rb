class Types::QueryType < Types::BaseObject
  # Add root-level fields here.
  # They will be entry points for queries on your schema.

  # TODO: remove me
  field :omen, Types::OmenType.connection_type, null: false, description: 'Fetch Omen' do
    argument :latitude, Float, required: true
    argument :longitude, Float, required: true
  end

  def omen(latitude: nil, longitude: nil)
    Oman.within(5, :units => :kms, origin: [latitude, longitude]).by_distance(origin: [latitude, longitude])
  end
end
