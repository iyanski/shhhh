class Cart < ActiveRecord::Base
  has_many :cart_items
  has_many :photos, :through => :cart_items
  
  def total_price
    total = 0
    cart_items.each do |item|
      total += item.price
    end
    total
  end
end
