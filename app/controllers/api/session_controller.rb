class Api::SessionController < ApiController
  
  def index
    respond_to do |format|
      format.json  { ext(:success => require_api_login) }
    end
  end
  
  def create
    respond_to do |format|
      format.json  { ext(:success => true) }
    end
  end
end