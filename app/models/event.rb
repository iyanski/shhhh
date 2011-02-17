class Event < ActiveRecord::Base
  has_many    :albums
  has_many    :photos
  belongs_to  :booking
  belongs_to  :user
  validates_presence_of :name
  
end
