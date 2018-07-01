class CreateLocations < ActiveRecord::Migration[5.2]
  def change
    create_table :locations do |t|
      t.float :lng
      t.float :lat

      t.timestamps
    end

    add_index :locations, :lat
    add_index :locations, :lng
    add_index :locations, [:lat, :lng], unique: true
    add_index :locations, [:lng, :lat], unique: true
  end
end
