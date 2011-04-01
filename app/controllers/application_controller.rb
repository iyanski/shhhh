class ApplicationController < ActionController::Base
  before_filter :initialize_cart
  protect_from_forgery
  
  
  def require_api_login
    if user_signed_in?
      true
    else
      false
    end
  end  
  
  def ext(options = {})
    defaults = HashWithIndifferentAccess.new({:success => true})
    options = defaults.merge(options)
    if options[:errors]
      options[:success] = false
    end
    
    render :json => options.to_json
  end

  private 
  def initialize_cart
    if session[:cart_id]
      @cart = Cart.find(session[:cart_id])
    else
      @cart = Cart.create
      session[:cart_id] = @cart.id
    end
  end
  
end
