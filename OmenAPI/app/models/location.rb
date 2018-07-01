# == Schema Information
#
# Table name: locations
#
#  id         :integer          not null, primary key
#  lng        :float
#  lat        :float
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Location < ApplicationRecord

  has_many :omen

  acts_as_mappable :default_units => :kilometers,
                   :default_formula => :sphere,
                   :distance_field_name => :distance,
                   :lat_column_name => :lat,
                   :lng_column_name => :lng
end
