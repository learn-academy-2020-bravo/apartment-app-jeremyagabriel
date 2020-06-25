class AddBedroomBathroomColumnsToApartments < ActiveRecord::Migration[6.0]
  def change
    add_column :apartments, :bedroom_count, :string
    add_column :apartments, :bathroom_count, :string
  end
end
