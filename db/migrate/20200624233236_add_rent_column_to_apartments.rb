class AddRentColumnToApartments < ActiveRecord::Migration[6.0]
  def change
    add_column :apartments, :rent, :string
  end
end
