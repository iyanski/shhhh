class Event < ActiveRecord::Base
  has_many    :albums
  has_many    :photos
  belongs_to  :booking
  belongs_to  :user
  validates_presence_of :name

  acts_as_extjs_store(
    :include => self.column_names,
    :filters => {
      :is_active => lambda{|bool| bool == 1 ? "Yes" : "No"},
      :created_at => lambda{|at| at.to_s(:timezone) },
      :updated_at => lambda{|at| at.to_s(:timezone) },
    }
  )
end
