class Photo < ActiveRecord::Base
  belongs_to  :user
  belongs_to  :album
  belongs_to  :post
  validates_presence_of   :file_name
  validates_presence_of   :file_type
  
  acts_as_extjs_store(
    :include => self.column_names,
    :filters => {
      :is_active => lambda{|bool| bool == 1 ? "Yes" : "No"},
      :created_at => lambda{|at| at.to_s(:timezone) },
      :updated_at => lambda{|at| at.to_s(:timezone) },
    }
  )
  
end
