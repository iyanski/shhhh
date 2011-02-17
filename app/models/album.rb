class Album < ActiveRecord::Base
  belongs_to  :event
  belongs_to  :user
  has_many    :photos
  
  validates_presence_of   :name
end
