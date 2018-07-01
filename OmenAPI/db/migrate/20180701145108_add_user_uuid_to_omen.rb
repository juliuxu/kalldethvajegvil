class AddUserUuidToOmen < ActiveRecord::Migration[5.2]
  def change
    add_column :omen, :user_uuid, :string
  end
end
