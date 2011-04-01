class EventsController < ApplicationController
  def index
    @page_title = "Events"
    @events = Post.find_all_by_is_active(1).paginate(:page => params[:page], :per_page => 10)
    Rails.logger.info(@events.inspect)
  end
  
  def show
    post = Post.find_by_id(params[:id])
    @page_title = post.name
    @albums = post.albums.paginate(:page => params[:page], :per_page => 10)
  end
  
end
