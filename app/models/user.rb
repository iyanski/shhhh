class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :token_authenticatable, :confirmable, :lockable and :timeoutable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  # Setup accessible (or protected) attributes for your model
  attr_accessible :email, :password, :password_confirmation, :remember_me
  
  acts_as_extjs_store(
    :include => self.column_names,
    :filters => {
      :is_active => lambda{|bool| bool == 1 ? "Yes" : "No"},
      :created_at => lambda{|at| at.to_s(:timezone) },
      :updated_at => lambda{|at| at.to_s(:timezone) },
    }
  )
end
