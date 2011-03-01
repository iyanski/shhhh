class Api::UsersController < ApiController
  
  def list
    respond_to do |format|
      format.json  { ext User.store{ find(:all) } }
      format.html  { ext User.store{ find(:all) } }
    end
  end
  
  def show
    event = User.find_by_id(params[:id])
    respond_to do |format|
      format.json  { render :json => event }
    end
  end
  
end