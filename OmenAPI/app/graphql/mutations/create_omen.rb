class Mutations::CreateOmen < Mutations::BaseMutation
  null true

  argument :message, String, required: true
  argument :user_uuid, String, required: true
  argument :longitude, Float, required: true
  argument :latitude, Float, required: true

  field :omen, Types::OmenType, null: true
  field :errors, [String], null: false

  def resolve(message: nil, user_uuid: nil, longitude: nil, latitude: nil)
    location = Location.find_or_create_by(lng: longitude, lat: latitude)
    omen = location.omen.find_or_initialize_by(message: message, user_uuid: user_uuid)

    if omen.save
      # Successful creation, return the created object with no errors
      {
        omen: omen,
        errors: [],
      }
    else
      # Failed save, return the errors to the client
      {
        omen: nil,
        errors: comment.errors.full_messages
      }
    end
  end
end