class Album < ActiveRecord::Base
  belongs_to  :event
  has_many    :photos
  
  validates_presence_of   :name
end
