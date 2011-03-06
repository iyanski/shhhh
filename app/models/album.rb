class Album < ActiveRecord::Base
  belongs_to  :post
  has_many    :photos
  
  validates_presence_of   :name
  
  
  
end
