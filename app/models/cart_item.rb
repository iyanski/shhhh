class CartItem < ActiveRecord::Base
  belongs_to :cart
  belongs_to :photo
  belongs_to :paper_size
  belongs_to :paper_type
end
