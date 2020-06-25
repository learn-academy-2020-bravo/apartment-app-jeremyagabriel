class AddDescriptionAndImageUrlToApartments < ActiveRecord::Migration[6.0]
  def change
    add_column :apartments, :description, :text
    add_column :apartments, :image_url, :string
  end
end
