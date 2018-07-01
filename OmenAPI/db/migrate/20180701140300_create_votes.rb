class CreateVotes < ActiveRecord::Migration[5.2]
  def change
    create_table :votes do |t|
      t.integer :value
      t.string :user_uuid
      t.references :omen, foreign_key: true

      t.timestamps
    end
    add_index :votes, [:user_uuid, :omen_id], unique: true
  end
end
