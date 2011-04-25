module ApplicationHelper
  def cart_items
    unless Cart.find(session[:cart_id]).cart_items.nil?
      Cart.find(session[:cart_id]).cart_items
    end
  end  
end
