class Types::MutationType < Types::BaseObject
  
  field :createOmen, mutation: Mutations::CreateOmen
  field :downVote, mutation: Mutations::DownVote
  field :upVote, mutation: Mutations::UpVote
end
