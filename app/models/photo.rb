class Photo < ActiveRecord::Base
  belongs_to  :user
  belongs_to  :album
  belongs_to  :event
  validates_presence_of   :file_name
  validates_presence_of   :file_type
end
