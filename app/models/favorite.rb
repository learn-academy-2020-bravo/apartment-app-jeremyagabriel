class Favorite < ApplicationRecord
  belongs_to :user
  validates :listing, presence: true
  validates :listing, :uniqueness => { :scope => :user_id }
end
