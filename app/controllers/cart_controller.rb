class CartController < ApplicationController
  def index
    
  end
  def create
    respond_to do |format|
      format.json{
        @cart = Cart.find(session[:cart_id])
        @cart.cart_items.create(:photo_id => params[:photo_id], :cart_id => @cart.id)
        render :json => {:success => true, :message => @cart.cart_items}
      }
    end
  end
end
