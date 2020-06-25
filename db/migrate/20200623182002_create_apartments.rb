class CreateApartments < ActiveRecord::Migration[6.0]
  def change
    create_table :apartments do |t|
      t.string :street_number
      t.string :city
      t.string :state
      t.string :zip
      t.string :country
      t.string :building_manager
      t.string :phone
      t.string :hours

      t.timestamps
    end
  end
end
