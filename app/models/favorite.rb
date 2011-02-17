class Favorite < ActiveRecord::Base
  belongs_to  :customer
  has_one     :photo
end
