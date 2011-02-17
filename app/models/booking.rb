class Booking < ActiveRecord::Base
  has_one :event
  belongs_to  :customer
end
