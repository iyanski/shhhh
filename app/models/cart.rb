class Cart < ActiveRecord::Base
  has_many :cart_items
  has_many :photos, :through => :cart_items
end
