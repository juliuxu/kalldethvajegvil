# == Schema Information
#
# Table name: omen
#
#  id          :integer          not null, primary key
#  message     :text
#  location_id :integer
#  score       :integer
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  user_uuid   :string
#

class Oman < ApplicationRecord
  belongs_to :location
  has_many :votes, foreign_key: :omen_id
  acts_as_mappable through: :location
end
