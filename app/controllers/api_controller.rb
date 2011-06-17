class ApiController < ApplicationController
  before_filter :require_api_login  
  
  def photo_path
    "/Users/devian/Projects/drewaltizer/photos"
  end
  def info
    ext({
      :success => true
    })
  end
end