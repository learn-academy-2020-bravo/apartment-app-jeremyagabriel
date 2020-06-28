class ChangeAptIdDataTypeInFavorites < ActiveRecord::Migration[6.0]
  def change
    change_column :favorites, :apt_id, :string
  end
end
