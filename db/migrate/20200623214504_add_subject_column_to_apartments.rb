class AddSubjectColumnToApartments < ActiveRecord::Migration[6.0]
  def change
    add_column :apartments, :subject, :string
  end
end
