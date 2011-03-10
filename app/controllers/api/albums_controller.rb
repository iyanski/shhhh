class Api::AlbumsController < ApiController
  
  def list
    respond_to do |format|
      format.json  { ext Post.store{ find_by_id(params[:id]) } }
    end
  end
  
  def show
    respond_to do |format|
      id = params[:id]
      opts = {}.merge(params.symbolize_keys.slice(:start, :limit, :sort, :dir))
      format.json {
        ext(
          Photo.store { 
            find(:all, opts.merge(:conditions => ['album_id = %s' % id]) ) 
          }
        )
      }
    end
  end
end
