class ApiController < ApplicationController
  before_filter :require_api_login
  
  def info
    ext({
      :success => true
    })
  end
end