class ChangeAptIdNameInFavorites < ActiveRecord::Migration[6.0]
  def change
    rename_column :favorites, :apt_id, :listing
  end
end
