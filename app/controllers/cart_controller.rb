class CartController < ApplicationController
  
  respond_to :html, :xml, :json
  def index
    cart = Cart.find(session[:cart_id])
    @cart_items = cart.cart_items
    @total_price = cart.total_price
  end
    
  def remove_item
    @id = params[:id]
    @cart_item = CartItem.find(@id)
    @cart_item.delete
  end
  
  def add_item
    @cart = Cart.find(session[:cart_id])
    cart_item = CartItem.new(:photo_id => params[:id], :cart_id => @cart.id)
    cart_item.cart = @cart
    cart_item.price = PaperSize.first.price
    cart_item.paper_size = PaperSize.first
    cart_item.paper_type = PaperType.first
    cart_item.save
    flash[:notice] = "Cart Created"
  end
  
  def change_paper_size
    unless params[:cart_item_id] == 'all'
      @id = params[:cart_item_id]
      @price = PaperSize.find(params[:id]).price
      @cart_item = CartItem.find(@id)
      @cart_item.paper_size_id = params[:id]
      @cart_item.price = @price
      @cart_item.save
    else
      @cart_items = Cart.find(session[:cart_id]).cart_items
      paper_size = PaperSize.find(params[:id])
      @cart_items.each do |item|
        item.paper_size = paper_size
        item.price = paper_size.price * item.quantity + item.paper_type.price
        item.save
      end
      @price = paper_size.price
    end
  end
  
  def change_paper_type
    @cart_items = Cart.find(session[:cart_id]).cart_items
    paper_type = PaperType.find(params[:id])
    @cart_items.each do |item|
      item.paper_type = paper_type
      item.price = item.paper_size.price * item.quantity + paper_type.price
      item.save
    end
  end
  
  def change_quantity
    @id = params[:cart_item_id]
    @cart_item = CartItem.find(@id)
    paper_type_price = @cart_item.paper_type.price
    @cart_item.quantity = params[:quantity].to_i
    @cart_item.price = @cart_item.paper_size.price * params[:quantity].to_i + paper_type_price
    @cart_item.save
    @price = @cart_item.paper_size.price * params[:quantity].to_f + paper_type_price
  end
  
  def duplicate_item
    @item = CartItem.find(params[:id])
    @cart_item = @item.clone
    @cart_item.save
  end
end
