class Types::OmenType < Types::BaseObject
  field :id, ID, null: false
  field :message, String, null: true
  field :score, Integer, null: true
  field :upvotes, Integer, null: true, resolve: -> (obj, args, ctx) { obj.votes.where(value: 1).count }
  field :downvotes, Integer, null: true, resolve: -> (obj, args, ctx) { obj.votes.where(value: -1).count }
  field :latitude, Float, null: false, resolve: -> (obj, args, ctx) { obj.location.lat }
  field :longitude, Float, null: false, resolve: -> (obj, args, ctx) { obj.location.lng }
end
