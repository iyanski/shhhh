class Booking < ActiveRecord::Base
  has_one :post
  belongs_to  :customer
end
