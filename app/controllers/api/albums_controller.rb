class Api::AlbumsController < ApiController
  
  def list
    respond_to do |format|
      format.json  { ext Post.store{ find_by_id(params[:id]) } }
    end
  end
  
  def show
    respond_to do |format|
      format.json  { ext Album.store{ find_by_id(params[:id]) } }
    end
  end
end
