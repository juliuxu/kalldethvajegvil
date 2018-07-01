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

require 'test_helper'

class OmanTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
