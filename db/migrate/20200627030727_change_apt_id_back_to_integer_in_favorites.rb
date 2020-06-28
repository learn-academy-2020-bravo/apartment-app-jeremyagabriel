class ChangeAptIdBackToIntegerInFavorites < ActiveRecord::Migration[6.0]
  def change
    change_column :favorites, :apt_id, 'integer USING CAST(apt_id AS integer)'
  end
end
