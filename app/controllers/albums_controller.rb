class AlbumsController < ApplicationController
  
  def show
    @album = Album.find_by_id(params[:id])
    Rails.logger.info(@album.inspect)
    @page_title = @album.name
    @photos = @album.photos.paginate(:page => params[:page], :per_page => 20)
  end
  
end
