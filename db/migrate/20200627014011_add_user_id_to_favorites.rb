class AddUserIdToFavorites < ActiveRecord::Migration[6.0]
  def change
    add_column :favorites, :user_id, :integer
  end
end
