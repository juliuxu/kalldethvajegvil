class Mutations::DownVote < Mutations::BaseMutation
  null true

  argument :omen_id, Integer, required: true
  argument :user_uuid, String, required: true

  field :omen, Types::OmenType, null: true
  field :errors, [String], null: false

  def resolve(omen_id: nil, user_uuid: nil)
    omen = Oman.find_by(id: omen_id.to_i)
    
    vote = omen.votes.find_or_initialize_by(user_uuid: user_uuid)
    vote.value = -1

    if vote.save
      # Successful creation, return the created object with no errors
      {
        omen: omen,
        errors: [],
      }
    else
      # Failed save, return the errors to the client
      {
        omen: nil,
        errors: vote.errors.full_messages
      }
    end
  end
end