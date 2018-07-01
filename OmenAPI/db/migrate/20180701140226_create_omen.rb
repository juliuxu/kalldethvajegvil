class CreateOmen < ActiveRecord::Migration[5.2]
  def change
    create_table :omen do |t|
      t.text :message
      t.references :location, foreign_key: true
      t.integer :score

      t.timestamps
    end
  end
end
