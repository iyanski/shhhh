class ApplicationController < ActionController::Base
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
end
